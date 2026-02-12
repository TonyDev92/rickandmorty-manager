// Middleware for protection of routes based on authentication status
// export default defineNuxtRouteMiddleware((to) => {

//     const isLoggedIn = useCookie('is_logged_in').value;
//     console.log('Middleware check - isLoggedIn:', isLoggedIn, 'Navigating to:', to.path);

//     if (!isLoggedIn && to.path !== '/login') {
//         return navigateTo('/login');
//     }

//     if (isLoggedIn && to.path === '/login') {
//         return navigateTo('/dashboard');
//     }

// });
// middleware/auth.ts
import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    
    // Si el usuario no tiene datos en el store (no está autenticado)
    // y no está en la página de login, lo expulsamos.
    if (!authStore.user && to.path !== '/login') {
        return navigateTo('/login');
    }

    // Si ya está autenticado e intenta ir al login, al dashboard.
    if (authStore.user && to.path === '/login') {
        return navigateTo('/dashboard');
    }
});