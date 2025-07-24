<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title: string
    date: string
    timeToRead: number
}>()
</script>

<template>
    <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <span class="text-sm text-gray-500">{{ date }}, {{ timeToRead }} min read</span>
    </div>
</template>