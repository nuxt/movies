<script setup lang="ts">
import type { ItemType, Movie } from '~/types'

defineProps<{
  type: ItemType
  item: Movie
}>()

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
</script>

<template>
  <NuxtLink :to="`/${type}/${item.id}`">
    <img
      :src="TMDB_IMAGE_BASE + item.poster_path"
      block border="4 gray4/10"
      transition duration-400 object-cover aspect="10/16"
      hover="scale-105 z10"
    >
    <h3 mt-2>
      {{ item.title || item.name }}
    </h3>
    <div text-sm op80 row gap-2 items-center>
      <Stars w-20 :value="item.vote_average" />
      {{ item.vote_average }}
    </div>
  </NuxtLink>
</template>
