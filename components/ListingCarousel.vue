<script setup lang="ts">
import type { Movie } from '~/types'

defineProps<{
  items: Movie[]
}>()
</script>

<template>
  <div overflow-y-auto>
    <div row gap-2 w-max p-2>
      <RouterLink
        v-for="i of items"
        :key="i.id"
        :to="`/movie/${i.id}`"
      >
        <MovieItem :item="i" flex-1 w-50 />
      </RouterLink>
    </div>
  </div>
</template>
