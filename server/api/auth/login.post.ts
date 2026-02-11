//  SERVER POST /api/auth/login

//  Imports 
import { defineEventHandler, readBody, setCookie, createError } from 'h3';

// Models
interface user {
    username: string;
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
    console.log('Login attempt:', email , password);
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        });
    }
    // JWT Simulation (base64) using credentials
    const payload = btoa(JSON.stringify({
        email,
        role: 'user',
        iat: Date.now()
    }));
    const fakeToken = `fake-jwt-token.${payload}.${btoa(password).substring(0, 10)}`

    // HTTP-only cookie 
    setCookie(event, 'auth', fakeToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day;
    });

    return {
        message: 'Login successful',
        user:{
            email: body.email,
            role: 'user',
        },
        token: fakeToken, // For demonstration; in real apps, you wouldn't return the token in the response body.
    };
});