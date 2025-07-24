import { ref, onMounted } from 'vue'
import type { Article, DrupalArticleObject } from '../src/types/types'

export function useDrupalApi() {
    const data = ref<DrupalArticleObject>()
    const articles = ref<Article[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchData = async () => {
        loading.value = true
        try {
            const response = await fetch('/api/article')
            if (!response.ok) throw new Error('Failed to fetch articles')
            data.value = await response.json()

            articles.value = data.value?.data || []
        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'An error occurred while fetching articles.'
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchData()
    })

    return { articles, loading, error }
}