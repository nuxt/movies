<script setup lang="ts">
import type { Movie } from '~/types'

const props = defineProps<{
  item: Movie
}>()

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original'
</script>

<template>
  <div relative class="aspect-ratio-25/9" bg-black>
    <div absolute bottom-0 top-0 right-0>
      <img :src="TMDB_IMAGE_BASE + item.backdrop_path" h-full>
    </div>
    <div absolute bottom-0 top-0 left-0 px-30 w="2/3" justify-center from-black via-black to-transparent bg-gradient-to-r>
      <h1 mt-2 text-6xl>
        {{ item.title }}
      </h1>
      <p mt-2 text-lg>
        {{ item.overview }}
      </p>
    </div>
  </div>
</template>
