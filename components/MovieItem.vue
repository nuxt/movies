<script setup lang="ts">
import type { Movie } from '~/types'

defineProps<{
  item: Movie
}>()

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
</script>

<template>
  <div>
    <img
      :src="TMDB_IMAGE_BASE + item.poster_path"
      block border="2 gray4/10"
      transition duration-400 object-cover aspect="10/16"
      hover="scale-105 z10"
    >
    <h3 mt-2>
      {{ item.title }}
    </h3>
    <div text-sm op80>
      {{ item.vote_average }} / 10
    </div>
  </div>
</template>
