<script setup lang="ts">
// This page captures all undefined routes and redirects to / (login page)
definePageMeta({
    middleware: [
        function (to) {
            return navigateTo('/');
        }
    ]
});
</script>

<template>
    <div>Redirect...</div>
</template>