<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import SpotlightSearch from './spotlight-search.vue'

</script>
<template>
  <div class="flex flex-col xsm:flex-row justify-between items-center">
    <NuxtLink to="/" class="flex items-center gap-4 !bg-background">
      <AcademicCapIcon class="size-16" />
      <div class="text-2xl font-bold">Alan's Thoughts</div>
    </NuxtLink>
    <SpotlightSearch />
  </div>
</template>
