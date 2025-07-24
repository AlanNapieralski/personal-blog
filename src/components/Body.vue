<script setup lang="ts">
import { parseArticleBody, type ParsedElement } from '../../services/parser'

const props = defineProps<{
    body: string
}>()

const parsedBody: ParsedElement[] = parseArticleBody(props.body)
console.log(parsedBody)

</script>


<template>
        <article class="prose prose-lg max-w-none">
            <div v-html="body"></div>
        </article>
</template>