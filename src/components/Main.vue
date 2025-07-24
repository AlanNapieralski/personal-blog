<script setup lang="ts">
import { useDrupalApi } from '../../services/drupalApi'
import { RouterLink } from 'vue-router'

const { articles, loading, error } = useDrupalApi()
</script>

<template>
    <div v-for="article in articles" :key="article.id">
      <RouterLink 
        :to="`/articles/${article.attributes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`" 
        class="text-blue-500 hover:underline text-xl font-bold">{{ article.attributes.title }}</RouterLink>
    </div>
</template>