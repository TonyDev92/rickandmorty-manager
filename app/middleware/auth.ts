export default defineNuxtRouteMiddleware((to, from) => {

    // Middleware to protect routes and redirect based on authentication status
    const authStore = useAuthStore();
    const userCookie = useCookie('sessionUser');

    const isAuthenticated = !!authStore.user || !!userCookie.value;

    if (!isAuthenticated && to.path !== '/login') {
        return navigateTo('/login');
    }

    if (isAuthenticated && to.path === '/login') {
        return navigateTo('/dashboard');
    }
});

