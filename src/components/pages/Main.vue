<script setup lang="ts">
import Article from '../Article.vue'
import { getPages } from '../../../services/drupalApi'
import type { Article as ArticleType } from '../../types/types'


const { pages } = getPages()
import { computed } from 'vue'

const home = computed(() => {
    return pages.value.find((page: ArticleType) => page.attributes.title === 'Welcome')
})
</script>

<template>
    <Article :key="home?.id" :article="home" />
</template>


<style>
</style>