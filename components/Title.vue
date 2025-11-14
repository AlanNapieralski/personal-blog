<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    title: string
    date: string
    timeToRead: number
}>()

const formattedDate = computed(() => {
    const dateObj = new Date(props.date)
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>

<template>
    <div class="flex flex-col gap-1 items-center sm:items-start">
        <h1 class="text-2xl font-bold text-center sm:text-left break-words max-w-full">{{ title }}</h1>
        <div class="text-sm text-gray-500 flex flex-wrap gap-2 justify-center sm:justify-start">
            <span>{{ formattedDate }}</span>
            <span>•</span>
            <span>{{ timeToRead }} min read</span>
        </div>
    </div>
</template>