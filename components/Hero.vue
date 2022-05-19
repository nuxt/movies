<script setup lang="ts">
import type { Movie } from '~/types'

const props = defineProps<{
  item: Movie
}>()

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original'
</script>

<template>
  <div relative class="aspect-ratio-16/9 md:aspect-ratio-25/9" bg-black>
    <div absolute bottom-0 top-0 right-0>
      <img :src="TMDB_IMAGE_BASE + item.backdrop_path" h-full>
    </div>
    <div
      absolute bottom-0 top-0 left-0 px-10 md:px-30 w="2/3"
      justify-center from-black via-black
      to-transparent bg-gradient-to-r
    >
      <h1 mt-2 text-4xl md:text-6xl>
        {{ item.title || item.name }}
      </h1>
      <div row gap3 items-center mt4>
        <Stars w-25 :value="item.vote_average" />
        <div op80>
          {{ item.vote_count }} Reviews
        </div>
      </div>
      <p mt-2 op80 leading-relaxed of-hidden line-clamp-3 md:line-clamp-5>
        {{ item.overview }}
      </p>
      <div py5 block>
        <button flex="~ gap2" items-center p="x6 y3" bg="gray/15 hover:gray/20" transition>
          <div i-fluent:play-24-filled />
          Watch Trailer
        </button>
      </div>
    </div>
  </div>
</template>
