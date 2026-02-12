import { defineStore } from 'pinia';

interface User {
    email: string;
    role: string;
}
/*
* Store for managing authentication state,
* including user data and loading status 
*/
export const useAuthStore = defineStore('auth', {
    state: () => {
        const userCookie = useCookie<User | null>('user_data');
        return {
            user: userCookie.value || null,
            isLoading: false, 
        };
    },
    actions: {
        async login(credentials: any) {
            this.isLoading = true; 
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: credentials
                });
                
                this.user = data.user;
                const userCookie = useCookie<User | null>('sessionUser');
                userCookie.value = data.user;

                return data;
            } catch (error) {
                throw error;
            } finally {
                this.isLoading = false; 
            }
        },
        async logout() {
            this.isLoading = true;
            try {
                this.user = null;
                const userCookie = useCookie<User | null>('user_data');
                userCookie.value = null;
                return navigateTo('/login');
            } finally {
                this.isLoading = false;
            }
        }
    }
});