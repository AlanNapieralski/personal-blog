<script setup lang="ts">
import Title from './Title.vue'
import Body from './Body.vue'
import { useDrupalApi } from '../../services/drupalApi'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { articles, loading, error } = useDrupalApi()
const route = useRoute()
const slug = route.params.slug as string

const article = computed(() => articles.value?.find(article => 
  article.attributes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
))
</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="article" class="flex flex-col space-y-6">
        <Title :title="article.attributes.title" :date="article.attributes.created" :timeToRead="0" />
        <Body :body="article.attributes.body.value"/>
    </div>
    <div v-else>Article not found</div>
</template>