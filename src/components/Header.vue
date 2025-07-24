<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

</script>
<template>
    <div class="flex justify-between items-center">
  <div class="flex items-center gap-4">
    <AcademicCapIcon class="size-16" />
    <a href="/" class="text-2xl font-bold">Alan's Thoughts</a>
  </div>
  <div class="flex items-center justify-between gap-4 bg-gray-200 rounded-sm px-4 py-2 w-40">
    <button>Search</button>
    <MagnifyingGlassIcon class="size-6" />
  </div>


    </div>
</template>