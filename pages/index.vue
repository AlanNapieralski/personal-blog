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
    <div class="flex flex-col space-y-6">
        <Article :key="home?.id" :article="home" />
        <div>
            <NuxtLink to="/posts" class="text-blue-600 hover:underline font-semibold">
                View all posts →
            </NuxtLink>
        </div>
    </div>
</template>
