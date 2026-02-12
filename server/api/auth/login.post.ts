import { defineEventHandler, readBody, setCookie, createError } from 'h3';

interface user {
    email: string; 
    role: string;
    iat: number;
}

interface loginRequest {
    email: string;
    password?: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<loginRequest>(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        });
    }

    const userData: user = {
        email: email,
        role: 'user',
        iat: Date.now()
    };

    const payload = btoa(JSON.stringify(userData));
    const fakeToken = `fake-jwt-token.${payload}.${btoa(password).substring(0, 10)}`;

    // HTTP-only cookie for authentication token
    setCookie(event, 'auth', fakeToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
    });

    // Cookie session user
    setCookie(event, 'sessionUser', JSON.stringify(userData), {
        // No httpOnly to allow client-side access for session management
        httpOnly: false, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
    });

    return {
        message: 'Login successful',
        user: userData,
        token: fakeToken,
    };
});