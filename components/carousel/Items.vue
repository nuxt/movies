<script setup lang="ts">
import type { MediaType, Media } from '~/types'

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
      flex-1 w-60
    />
  </CarouselBase>
</template>
