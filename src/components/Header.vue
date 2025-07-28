<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import SpotlightSearch from './spotlight-search.vue'

</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-4">
      <AcademicCapIcon class="size-16" />
      <a href="/" class="text-2xl font-bold">Alan's Thoughts</a>
    </div>
    <SpotlightSearch />
  </div>
</template>