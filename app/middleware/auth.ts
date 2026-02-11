// Middleware for protection of routes based on authentication status
export default defineNuxtRouteMiddleware((to) => {

    const isLoggedIn = useCookie('is_logged_in').value;
    console.log('Middleware check - isLoggedIn:', isLoggedIn, 'Navigating to:', to.path);

    if (!isLoggedIn && to.path !== '/login') {
        return navigateTo('/login');
    }

    if (isLoggedIn && to.path === '/login') {
        return navigateTo('/dashboard');
    }

});