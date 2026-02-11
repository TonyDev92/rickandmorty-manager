<script setup lang="ts">
import Header from '~/components/shared/header.vue';

definePageMeta({
    // This page requires authentication;
    // the 'auth' middleware will check for a valid token
    //  and redirect to /login if not authenticated.
    middleware: 'auth' 
});
</script>

<template>
    <div class="dashboard-layout">
        <Header />
        <header class="dashboard-header">
            <h2>Welcome to the Rick and Morty Dashboard!</h2>
        </header>

    </div>
</template>