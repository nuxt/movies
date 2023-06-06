<script setup lang="ts">
import type { Image } from '~/types'

const images = ref<Image[] | null>(null)
const index = ref(0)

const current = computed(() => images.value?.[index.value])

provideImageModal((img, idx) => {
  images.value = img
  index.value = idx
})

function prev() {
  if (!images.value?.length)
    return
  index.value = (index.value - 1 + images.value.length) % images.value.length
}

function next() {
  if (!images.value?.length)
    return
  index.value = (index.value + 1) % images.value.length
}

useEventListener('keydown', (e) => {
  if (!images.value)
    return
  if (e.key === 'Escape')
    images.value = null
  else if (e.key === 'ArrowLeft')
    prev()
  else if (e.key === 'ArrowRight')
    next()
})
</script>

<template>
  <div v-if="images && current" fixed top-0 left-0 right-0 bottom-0 z-10 bg-black:90 p5 flex items-center justify-center>
    <button absolute top-1 right-1 z-100 p3 text-3xl n-link bg-black:60 rounded-full @click="images = null">
      <div i-carbon-close />
    </button>
    <NuxtImg
      :key="current.file_path"
      format="webp"
      :src="`/tmdb${current.file_path}`"
      aria-hidden="true"
      max-w-full max-h-full object-contain
    />
    <div absolute left-0 top="1/2">
      <button py10 px4 bg-black:30 op10 hover:op100 @click="prev()">
        <div i-ph-caret-left-light text-3xl text-white />
      </button>
    </div>
    <div absolute right-0 top="1/2">
      <button py10 px4 bg-black:30 op10 hover:op100 @click="next()">
        <div i-ph-caret-right-light text-3xl text-white />
      </button>
    </div>
    <div absolute bottom-2 left-0 right-0 items-center>
      <div bg-black:50 px4 py2>
        {{ index + 1 }} / {{ images.length }}
      </div>
    </div>
  </div>
</template>
