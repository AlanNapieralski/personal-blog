<script setup lang="ts">

const props = defineProps<{
    body: string
}>()

</script>


<template>
        <article class="prose prose-lg max-w-none">
            <div v-html="body"></div>
        </article>
</template>