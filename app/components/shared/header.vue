<script setup lang="ts">
import Logout from '../ui/logout.vue';

const authStore = useAuthStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const handleLogout = async () => {
    closeMenu();
    await authStore.logout();
};
</script>

<template>
    <header class="header">
        <div class="header__container">
            <NuxtLink to="/" class="logo" @click="closeMenu">
                <span class="logo__rick">Rick</span>
                <span class="logo__and">&</span>
                <span class="logo__morty">Morty</span>
            </NuxtLink>

            <button 
                class="menu-toggle" 
                :class="{ 'is-active': isMenuOpen }" 
                @click="toggleMenu"
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="nav" :class="{ 'is-open': isMenuOpen }">
                <ul class="nav__list">
                    <li class="nav__item">
                        <NuxtLink to="/dashboard" class="nav__link" @click="closeMenu">Dashboard</NuxtLink>
                    </li>
                    <li class="nav__item">
                        <NuxtLink to="/favorites" class="nav__link" @click="closeMenu">Favorites</NuxtLink>
                    </li>
                    <li v-if="authStore.user" class="nav__item">
                        <Logout/>
                    </li>
                    <li v-else class="nav__item">
                        <NuxtLink to="/login" class="nav__link nav__link--login" @click="closeMenu">
                            Login
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>

        <div v-if="isMenuOpen" class="nav-overlay" @click="closeMenu"></div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    background-color: rgba($color-bg-dark, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba($color-rick-green, 0.2);
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 70px;
    display: flex;
    align-items: center;

    &__container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

// --- LOGO ---
.logo {
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -1px;

    &__rick { color: $color-rick-green; }
    &__and { color: white; margin: 0 2px; font-size: 1rem; }
    &__morty { color: $color-morty-blue; }
}

// --- TOGGLE MENU ---
.menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1100;

    @media (min-width: 768px) { display: none; }

    span {
        width: 100%;
        height: 3px;
        background-color: $color-rick-green;
        transition: all 0.3s ease;
        border-radius: 2px;
    }

    &.is-active {
        span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; }
        span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
    }
}

// --- NAV NAVIGATION ---
.nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background-color: $color-bg-dark;
    padding: 80px 2rem;
    transition: right 0.4s cubic-bezier(0.77, 0.2, 0.05, 1.0);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);

    &.is-open { right: 0; }

    @media (min-width: 768px) {
        position: static;
        width: auto;
        height: auto;
        background: none;
        padding: 0;
        box-shadow: none;
        transition: none;
    }

    &__list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
            gap: 1.5rem;
        }
    }

    &__link {
        color: white;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.2rem;
        transition: color 0.3s;

        &:hover, &.router-link-active {
            color: $color-rick-green;
        }

        @media (min-width: 768px) { font-size: 0.95rem; }
    }

    &__logout {
        background: rgba(255, 68, 68, 0.1);
        border: 1px solid #ff4444;
        color: #ff4444;
        padding: 0.5rem 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        width: 100%;

        &:hover {
            background: #ff4444;
            color: white;
        }

        @media (min-width: 768px) { width: auto; font-size: 0.85rem; }
    }
}

.nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 900;
}
</style>