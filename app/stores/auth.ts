import { defineStore } from 'pinia';

// Auth store to manage user authentication state
export const useAuthStore = defineStore('auth', () => {
    const userCookie = useCookie<any>('sessionUser');
    const user = ref(userCookie.value || null);
    const isLoading = ref(false);

    const login = async (credentials: any) => {
        isLoading.value = true;
        try {
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: credentials
            });
            
            user.value = data.user;
        } catch (error) {
            console.error("Portal access denied", error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        // In a real app, you would also call an API endpoint to clear the server-side session
        user.value = null;
        userCookie.value = null;
        await navigateTo('/login');
    };

    return {
        user,
        isLoading,
        login,
        logout
    };
});