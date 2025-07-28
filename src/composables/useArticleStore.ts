import { readonly } from 'vue'
import { getArticles } from '../../services/drupalApi'

const { articles, loading, error } = getArticles()

export function useArticleStore() {
    return {
        articles: readonly(articles),
        loading: readonly(loading),
        error: readonly(error)
    }
} 