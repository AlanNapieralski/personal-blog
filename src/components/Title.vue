<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title: string
    date: string
    timeToRead: number
}>()

const date = new Date(props.date)
const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
    <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <span class="text-sm text-gray-500">{{ formattedDate }}, {{ timeToRead }} min read</span>
    </div>
</template>