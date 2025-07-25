<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 class="text-6xl font-bold mb-4 text-primary">404</h1>
        <div class="text-2xl text-secondary mb-8">Page not found</div>
        <p class="text-primary mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
        </p>
        <RouterLink 
            to="/" 
            class="text-link hover:text-highlight transition-colors duration-200 text-lg">
            ← Back to home
        </RouterLink>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.flex {
    animation: fadeIn 0.5s ease-out;
}
</style>
