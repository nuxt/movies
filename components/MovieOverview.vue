<script setup lang="ts">
import type { Item, ItemType } from '~/types'
import { TMDB_IMAGE_BASE_THUMBNAIL } from '~/constants/images'

defineProps<{
  type: ItemType
  item: Item
}>()
</script>

<template>
  <div p4 grid="~ cols-[max-content_1fr]" gap-8 items-center>
    <img
      :src="TMDB_IMAGE_BASE_THUMBNAIL + item.poster_path"
      block border="4 gray4/10" w-79
      transition duration-400 object-cover aspect="10/16"
    >
    <MovieInfo :item="item" />
  </div>
</template>
