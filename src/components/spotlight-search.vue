<template>
  <div>
    <!-- Trigger Button -->
    <div class="flex justify-center">
      <button
        @click="openSpotlight"
        class="flex items-center gap-2 px-4 py-2 bg-shadow border border-link rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <Search class="w-4 h-4 text-gray-400" />
        <span class="text-gray-500">Search...</span>
        <kbd class="px-2 py-1 text-xs font-semibold text-primary border border-link rounded">⌘K</kbd>
      </button>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-200"
      :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }"
      @click="closeSpotlight"
    ></div>

    <!-- Spotlight Search Modal -->
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-[10vh] px-4"
    >
      <div
        class="w-full max-w-2xl rounded-xl shadow-2xl border border-link overflow-hidden transform transition-all duration-200"
        :class="{ 'scale-100 opacity-100': isOpen, 'scale-95 opacity-0': !isOpen }"
      >
        <!-- Search Input -->
        <div class="flex items-center px-4 py-3 border-b border-link">
          <Search class="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search for anything..."
            class="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-400"
            @keydown="handleKeydown"
          />
          <button
            @click="closeSpotlight"
            class="ml-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Search Results -->
        <div class="max-h-96 overflow-y-auto">
          <div v-if="searchQuery && filteredResults.length === 0" class="px-4 py-8 text-center text-primary">
            No results found for "{{ searchQuery }}"
          </div>
          
          <div v-else-if="searchQuery" class="my-2"
            >
            <div
              v-for="(result, index) in filteredResults"
              :key="result.id"
              class="flex items-center px-4 py-3 hover:bg-link cursor-pointer transition-colors group"
              :class="{ 'bg-link': index === selectedIndex }"
              @click="selectResult(result)"
            >
              <div class="flex-1">
                <div class="font-medium group-hover:text-black" :class="{ 'text-black': index === selectedIndex }">{{ result.attributes.title }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-4 py-3 bg-shadow border-t border-link flex items-center justify-between text-xs text-primary">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 border border-gray-200 rounded text-xs">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 border border-gray-200 rounded text-xs">↵</kbd>
              <span>Select</span>
            </div>
            <div class="flex items-center gap-1">
              <kbd class="px-1.5 py-0. border border-gray-200 rounded text-xs">esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, inject, type Ref } from 'vue'
import { Search, X, Clock, FileText, Users, Settings, Home, Mail } from 'lucide-vue-next'
import type { Article as ArticleType } from '../types/types'
import { useRouter } from 'vue-router'

const router = useRouter()

const isOpen = ref(false)
const searchQuery = ref('')
const selectedIndex = ref(0)
const searchInput = ref(null)
const hover = ref(false)

const { articles } = inject('articleStore') as { articles: Ref<ArticleType[]> }

const filteredResults = computed(() => {
  if (!searchQuery.value) return []
  
  return articles.value.filter(result =>
    result.attributes.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const openSpotlight = async () => {
  isOpen.value = true
  selectedIndex.value = 0
  await nextTick()
  searchInput.value?.focus()
}

const closeSpotlight = () => {
  isOpen.value = false
  searchQuery.value = ''
  selectedIndex.value = 0
}

const selectResult = (result: ArticleType) => {
  router.push(`/articles/${result.attributes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
  closeSpotlight()
}

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      closeSpotlight()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (filteredResults.value.length > 0) {
        selectedIndex.value = (selectedIndex.value + 1) % filteredResults.value.length
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (filteredResults.value.length > 0) {
        selectedIndex.value = (selectedIndex.value - 1 + filteredResults.value.length) % filteredResults.value.length
      }
      break
    case 'Enter':
      event.preventDefault()
      if (searchQuery.value && filteredResults.value.length > 0) {
        selectResult(filteredResults.value[selectedIndex.value])
      } else if (!searchQuery.value) {
        selectResult(filteredResults.value[selectedIndex.value])
      }
      break
  }
}

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    openSpotlight()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>