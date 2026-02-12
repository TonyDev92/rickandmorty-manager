// plugins/api-interceptor.ts
import { useAuthStore } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();

    // Interceptor global para todas las peticiones fetch de Nuxt
    nuxtApp.vueApp.mixin({
        // Esto configura el comportamiento de $fetch globalmente
    });

    // Definimos un helper global o simplemente escuchamos errores de respuesta
    globalThis.$fetch = $fetch.create({
        onResponseError({ response }) {
            if (response.status === 401 || response.status === 403) {
                // Si el servidor dice que no estamos autorizados:
                console.error('Sesión inválida o expirada');
                authStore.logout(); // Limpia el Store y las cookies de cliente
                navigateTo('/login');
            }
        }
    });
});