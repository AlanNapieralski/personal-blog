<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div class="flex flex-col min-h-screen max-w-[800px] mx-auto px-4 space-y-8">
    <Header />
    <RouterView />
    <Footer /> 
  </div>

</template>
