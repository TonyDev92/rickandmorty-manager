<script setup lang="ts">
const authStore = useAuthStore();

// Function to handle user logout, which calls the logout method from the auth store
const handleLogout = () => {
    authStore.logout();
};
</script>

<template>
    <div class="logout-container">
        <button class="logout-button" @click="handleLogout" title="Logout">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="logout-icon"
            >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            <span class="logout-text">Logout</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.logout-container {
    display: flex;
    align-items: center;
}

.logout-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba($color-error, 0.1);
    color: $color-error;
    border: 1px solid rgba($color-error, 0.4);
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;

    &:hover {
        background: $color-error;
        color: white;
        box-shadow: 0 0 15px rgba($color-error, 0.4);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        filter: brightness(0.8);
    }

    .logout-icon {
        flex-shrink: 0;
        transition: transform 0.3s ease;
    }

    &:hover .logout-icon {
        transform: rotate(90deg); // Pequeño guiño visual al girar el icono
    }
}

// Ocultar texto en pantallas muy pequeñas para mantener el header limpio
@media (max-width: 480px) {
    .logout-text {
        display: none;
    }
    .logout-button {
        padding: 0.6rem;
        border-radius: 50%;
    }
}
</style>