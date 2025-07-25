<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div class="bg-background text-primary min-h-screen">
    <div class="font-mono flex flex-col min-h-screen max-w-[800px] mx-auto px-4 space-y-8">
      <Header />
      <main class="flex-1"> <!-- Add flex-1 to make main content take available space -->
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style>
body {
  line-height: 1.5;
} 

p {
  margin-bottom: 1rem;
}

a {
   color: var(--color-link);
   background-color: var(--color-shadow);
   padding: 0.2rem;
   border-radius: 0.3rem;
   text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

hr {
    border-color: var(--color-shadow);
}

img {
    border-radius: 0.5rem;
    border: 4px solid var(--color-shadow);
}

html {
    background-color: var(--color-background);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>