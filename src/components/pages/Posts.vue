<script setup lang="ts">
import { getPages } from '../../../services/drupalApi'
import Article from '../Article.vue'
import { getArticles } from '../../../services/drupalApi'
import type { Article as ArticleType } from '../../types/types'

const { pages, loading, error } = getPages()
const { articles, loading: articlesLoading, error: articlesError } = getArticles()
import { computed } from 'vue'

const page = computed<ArticleType | undefined>(() => {
    return pages.value.find((page: ArticleType) => page.attributes.title === 'Posts')
})

</script>

<template>
    <div class="flex flex-col">
        <Article :key="page?.id" :article="page" />
        <ul v-for="article in articles" :key="article.id">
        <li>
            <RouterLink 
            :to="`/articles/${article.attributes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`" 
            class="text-md font-bold">{{ article.attributes.title }}</RouterLink>
        </li>
        </ul>
    </div>
</template>