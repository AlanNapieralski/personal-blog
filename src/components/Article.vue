<script setup lang="ts">
import Title from './Title.vue'
import Body from './Body.vue'
import { getArticles } from '../../services/drupalApi'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { Article as ArticleType } from '../types/types'
import type { PropType } from 'vue'
import Loading from './Loading.vue'

const props = defineProps({
    article: {
        type: Object as PropType<ArticleType>,
        required: false
    }
})

const { articles, loading, error } = getArticles()
const route = useRoute()
const slug = route.params.slug as string

const article = computed(() => {
    if (props.article) return props.article
    
    return articles.value?.find((article: ArticleType) => 
        article.attributes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
    )
})

</script>

<template>
    <div v-if="loading">
        <Loading :delay="300" />
    </div>
    <div v-else-if="error">
        <div class="text-center py-8 text-secondary">
            <div class="text-xl mb-2">Error</div>
            <div>{{ error }}</div>
        </div>
    </div>
    <div v-else-if="article" class="flex flex-col space-y-6">
        <Title :title="article.attributes.title" :date="article.attributes.created" :timeToRead="0" />
        <Body :body="article.attributes.body.value"/>
    </div>
    <div v-else>
        <div class="text-center py-8 text-secondary">
            Article not found
        </div>
    </div>
</template>