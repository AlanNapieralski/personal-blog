<script setup lang="ts">
import { computed } from 'vue'
import { getPages } from '~/services/contentApi'
import type { Article as ArticleType } from '~/types/types'

const { pages } = getPages()

const home = computed(() => {
    return pages.value.find((page: ArticleType) => page.attributes.title === 'Welcome')
})
</script>

<template>
    <Article :key="home?.id" :article="home" />
</template>
