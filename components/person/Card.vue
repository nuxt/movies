<script setup lang="ts">
import type { Person } from '~/types'

defineProps<{
  item: Person
}>()
</script>

<template>
  <NuxtLink :to="`/person/${item.id}`" data-testid="person-link">
    <div block bg-gray4:10 p1 class="aspect-10/16" transition duration-400 hover="scale-105 z10" data-testid="person-container">
      <NuxtImg v-if="item.profile_path" width="500" height="800" format="webp" :src="`/tmdb${item.profile_path}`" :alt="item.name" w-full h-full object-cover data-testid="person-image" />
      <div v-else h-full op10 data-testid="person-placeholder">
        <div i-ph:user ma text-4xl />
      </div>
    </div>
    <div mt-2 data-testid="person-name">
      {{ item.name }}
    </div>
    <div op50 data-testid="person-character">
      {{ item.character || item.known_for_department }}
    </div>
  </NuxtLink>
</template>
