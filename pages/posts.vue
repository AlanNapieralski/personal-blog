<script setup lang="ts">
import { getPages } from '~/services/contentApi'
import type { Article as ArticleType } from '~/types/types'
import type { Ref } from 'vue'

const { pages } = getPages()

const page = computed<ArticleType | undefined>(() => {
    return pages.value.find((page: ArticleType) => page.attributes.title === 'Posts')
})

const { articles } = inject('articleStore') as { articles: Ref<ArticleType[]> }
</script>

<template>
    <div class="flex flex-col">
        <Article :key="page?.id" :article="page" />
        <ul v-for="article in articles" :key="article.id">
            <li>
                <NuxtLink 
                :to="`/articles/${article.attributes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`" 
                class="text-md font-bold">{{ article.attributes.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>
