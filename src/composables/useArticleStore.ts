import { readonly } from 'vue'
import { getArticles } from '../../services/contentApi'

const { articles, loading, error } = getArticles()

export function useArticleStore() {
    return {
        articles: readonly(articles),
        loading: readonly(loading),
        error: readonly(error)
    }
} 