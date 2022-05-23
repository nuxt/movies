<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  type: MediaType
  item: Media
}>()
</script>

<template>
  <MovieInfo :item="item" />
  <CarouselBase>
    <template #title>
      Cast
    </template>
    <CardPerson
      v-for="i of item.credits?.cast"
      :key="i.id"
      :item="i"
      flex-1 w-50
    />
  </CarouselBase>
</template>
