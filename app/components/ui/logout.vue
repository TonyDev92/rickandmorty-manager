<script setup lang="ts">
const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
};
</script>

<template>
    <div>
        <button @click="handleLogout">Logout</button>
    </div>
</template>