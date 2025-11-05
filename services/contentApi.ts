import { ref } from 'vue'
import { marked } from 'marked'
import type { Article } from '../src/types/types'

const articles = ref<Article[]>([])
const articlesLoading = ref(false)
const articlesError = ref<string | null>(null)

const pages = ref<Article[]>([])
const pagesLoading = ref(false)
const pagesError = ref<string | null>(null)

// Parse frontmatter and content from markdown
function parseMarkdown(content: string, filename: string): Article | null {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const match = content.match(frontmatterRegex)
    
    if (!match) return null
    
    const frontmatter = match[1]
    const markdownContent = match[2]
    
    // Parse frontmatter
    const metadata: Record<string, string> = {}
    frontmatter.split('\n').forEach(line => {
        const [key, ...values] = line.split(':')
        if (key && values.length > 0) {
            metadata[key.trim()] = values.join(':').trim()
        }
    })
    
    // Convert markdown to HTML
    const html = marked(markdownContent)
    
    return {
        id: filename.replace('.md', ''),
        attributes: {
            title: metadata.title || 'Untitled',
            body: {
                value: html as string,
                format: 'html'
            },
            created: metadata.created || new Date().toISOString(),
            changed: metadata.created || new Date().toISOString(),
            revision_timestamp: metadata.created || new Date().toISOString(),
            langcode: 'en',
            type: metadata.type || 'article'
        }
    }
}

// Load content files
async function loadMarkdownFiles(type: 'articles' | 'pages'): Promise<Article[]> {
    let context;
    if (type === 'articles') {
        context = import.meta.glob('/content/articles/*.md', { as: 'raw' });
    } else {
        context = import.meta.glob('/content/pages/*.md', { as: 'raw' });
    }
    
    const loadedArticles: Article[] = []
    
    for (const path in context) {
        const content = await context[path]()
        const filename = path.split('/').pop() || ''
        const article = parseMarkdown(content, filename)
        if (article) {
            loadedArticles.push(article)
        }
    }
    
    return loadedArticles
}

async function fetchArticles() {
    articlesLoading.value = true
    try {
        articles.value = await loadMarkdownFiles('articles')
    } catch (err: unknown) {
        articlesError.value = err instanceof Error ? err.message : 'An error occurred while loading articles.'
    } finally {
        articlesLoading.value = false
    }
}

async function fetchPages() {
    pagesLoading.value = true
    try {
        pages.value = await loadMarkdownFiles('pages')
    } catch (err: unknown) {
        pagesError.value = err instanceof Error ? err.message : 'An error occurred while loading pages.'
    } finally {
        pagesLoading.value = false
    }
}

// Initialize data
fetchArticles()
fetchPages()

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
