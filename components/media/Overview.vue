<script setup lang="ts">
import type { Media } from '~/types'

defineProps<{
  item: Media
}>()
</script>

<template>
  <MediaInfo :item="item" />
  <CarouselBase>
    <template #title>
      Cast
    </template>
    <PersonCard
      v-for="i of item.credits?.cast"
      :key="i.id"
      :item="i"
      flex-1 w-50
    />
  </CarouselBase>
</template>
