<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
    delay: {
        type: Number,
        default: 300 // 300ms delay before showing
    }
})

const show = ref(false)

onMounted(() => {
    setTimeout(() => {
        show.value = true
    }, props.delay)
})
</script>

<template>
    <div v-if="show" class="flex justify-center items-center py-12">
        <div class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
</template>

<style scoped>
.dots-container {
    display: flex;
    gap: 8px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--color-link);
    animation: pulse 1.5s ease-in-out infinite;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
}
</style> 