<script setup lang="ts">
// Importamos el componente explícitamente si no tienes auto-import configurado
import Logout from '~/components/ui/logout.vue';

const authStore = useAuthStore();
const cookie = useCookie('is_logged_in');

// Comprobamos ambos: el estado en memoria y la persistencia en cookie
const isAuthenticated = computed(() => {
    return !!authStore.user || !!cookie.value;
});

// Debug para consola: esto te dirá en tiempo real qué está pasando
watchEffect(() => {
    console.log("Auth Status Check:", {
        storeUser: authStore.user,
        cookieValue: cookie.value,
        finalResult: isAuthenticated.value
    });
});
</script>

<template>
    <header class="main-header">
        <div class="main-header__container">
            <div class="main-header__branding">
                <h1 class="main-header__title">
                    Rick and Morty <span class="highlight">Dashboard</span>
                </h1>
            </div>

            <nav class="main-header__nav">
                <ul class="nav-list">
                    <li class="nav-list__item">
                        <NuxtLink to="/" class="nav-list__link">Home</NuxtLink>
                    </li>

                    <li v-if="isAuthenticated" class="nav-list__item">
                        <NuxtLink to="/dashboard" class="nav-list__link">Dashboard</NuxtLink>
                    </li>

                    <li class="nav-list__item">
                        <NuxtLink v-if="!isAuthenticated" to="/login" class="nav-list__link nav-list__link--login">
                            Login
                        </NuxtLink>

                        <Logout v-else />
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.main-header {
    background: rgba($color-bg-dark, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba($color-rick-green, 0.2);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;

    &__container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        color: white;
        font-size: 1.2rem;

        .highlight {
            color: $color-rick-green;
            font-family: monospace;
        }
    }
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;

    &__link {
        color: $color-text-main;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
        transition: color 0.3s;

        &:hover,
        &.router-link-active {
            color: $color-rick-green;
        }

        &--login {
            padding: 0.5rem 1.2rem;
            border: 1px solid $color-rick-green;
            border-radius: 4px;
            color: $color-rick-green;

            &:hover {
                background: rgba($color-rick-green, 0.1);
            }
        }
    }
}
</style>