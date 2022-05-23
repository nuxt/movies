<script setup lang="ts">
import type { Media } from '~/types'
import { TMDB_IMAGE_BASE_ORIGINAL } from '~/constants/images'

const { item } = defineProps<{
  item: Media
}>()

let showModal = $ref(false)
const trailer = $computed(() => getTrailer(item))

function playTrailer() {
  showModal = true
}
</script>

<template>
  <div>
    <div relative class="aspect-ratio-3/2 lg:aspect-ratio-25/9" bg-black>
      <div absolute lt-lg:left-0 lg:bottom-0 top-0 right-0>
        <img :src="TMDB_IMAGE_BASE_ORIGINAL + item.backdrop_path" h-full>
      </div>
      <div
        absolute bottom-0 left-0 px-10
        lt-lg="bg-gradient-to-t right-0 p10"
        lg="top-0 px25 w-2/3 bg-gradient-to-r"
        justify-center from-black via-black
        to-transparent
      >
        <h1 mt-2 text-4xl lg:text-5xl>
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
        <div v-if="trailer" py5 display-none lg:block>
          <button
            flex="~ gap2" items-center p="x6 y3"
            bg="gray/15 hover:gray/20" transition
            @click="playTrailer()"
          >
            <div i-ph-play />
            Watch Trailer
          </button>
        </div>
      </div>
      <div v-if="trailer" lg:hidden absolute left-0 top-0 right-0 h="2/3" items-center justify-center>
        <button
          items-center p10 text-5xl op20 hover:op80 transition
          @click="playTrailer()"
        >
          <div i-ph-play-circle-light />
        </button>
      </div>
    </div>
  </div>
  <div v-if="trailer && showModal" fixed top-0 left-0 right-0 bottom-0 z-10 bg-black:90>
    <button absolute top-1 right-1 p5 text-xl @click="showModal = false">
      <div i-carbon-close />
    </button>
    <iframe :src="trailer.src" h-full m20 border-none />
  </div>
</template>
