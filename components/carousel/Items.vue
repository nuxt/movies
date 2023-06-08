<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  type: MediaType
  items: Media[]
}>()
</script>

<template>
  <CarouselBase>
    <MediaCard
      v-for="i of items"
      :key="i.id"
      :item="i"
      :type="type"
      flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>
