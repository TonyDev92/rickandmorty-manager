import { useAuthStore } from "#imports";
// Interceptor for handling API responses globally, especially for authentication errors

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    
    nuxtApp.vueApp.mixin({
    });

    globalThis.$fetch = $fetch.create({
        onResponseError({ response }) {
            if (response.status === 401 || response.status === 403) {
                console.error('Sesión inválida o expirada');
                authStore.logout(); 
                navigateTo('/login');
            }
        }
    });
});