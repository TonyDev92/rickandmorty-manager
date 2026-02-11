import { defineStore } from 'pinia';

interface User {
    email: string;
    role: string;
}

interface LoginBody {
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', () => {
    // Estate and actions for authentication management
    // User state, login status cookie, and loading indicator
    const user = ref<User | null>(null);
    const isLoggedInIndicator = useCookie('is_logged_in');
    const isLoading = ref(false);

    const login = async (credentials: LoginBody) => {
        isLoading.value = true;
        try {
            // API call to login endpoint (handled by server/api/auth/login.post.ts)
            const response = await $fetch('/api/auth/login', {
                method: 'POST',
                body: credentials
            });
            
            user.value = response.user;
            isLoggedInIndicator.value = 'true';
            return response;
        } catch (error) {
            throw error;
        }finally{
            isLoading.value = false;
        }


    };
    return { login, user , isLoading};
});