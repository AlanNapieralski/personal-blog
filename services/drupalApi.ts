import { ref } from 'vue'
import type { Article } from '../src/types/types'

// Create shared refs
const articles = ref<Article[]>([])
const articlesLoading = ref(false)
const articlesError = ref<string | null>(null)

const pages = ref<Article[]>([])
const pagesLoading = ref(false)
const pagesError = ref<string | null>(null)

// Fetch functions
async function fetchArticles() {
    articlesLoading.value = true
    try {
        const response = await fetch('/api/article')
        if (!response.ok) throw new Error('Failed to fetch articles')
        const data = await response.json()
        articles.value = data.data || []
    } catch (err: unknown) {
        articlesError.value = err instanceof Error ? err.message : 'An error occurred while fetching articles.'
    } finally {
        articlesLoading.value = false
    }
}

async function fetchPages() {
    pagesLoading.value = true
    try {
        const response = await fetch('/api/page')
        if (!response.ok) throw new Error('Failed to fetch pages')
        const data = await response.json()
        pages.value = data.data || []
    } catch (err: unknown) {
        pagesError.value = err instanceof Error ? err.message : 'An error occurred while fetching pages.'
    } finally {
        pagesLoading.value = false
    }
}

// Initialize data
fetchArticles()
fetchPages()

// Export functions that return the shared refs
export function getArticles() {
    return { 
        articles, 
        loading: articlesLoading, 
        error: articlesError,
        refresh: fetchArticles
    }
}

export function getPages() {
    return { 
        pages, 
        loading: pagesLoading, 
        error: pagesError,
        refresh: fetchPages
    }
}