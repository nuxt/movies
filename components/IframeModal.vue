<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

const src = ref<string | null>(null)

function showModal(link: string) {
  src.value = link
}
const el = ref<HTMLIFrameElement>()

provideIframeModal(showModal)

onKeyDown('Escape', () => {
  if (src.value)
    src.value = null
})

onClickOutside(el, () => {
  src.value = null
})
</script>

<template>
  <div v-if="src" fixed top-0 left-0 right-0 bottom-0 z-10 bg-black:90 flex>
    <button
      absolute top-1 right-1 z-100 p3 text-3xl n-link bg-black:60 rounded-full
      title="Close"
      @click="src = null"
    >
      <div i-carbon-close />
    </button>
    <iframe
      ref="el"
      allow="autoplay; encrypted-media"
      allowfullscreen
      :src="src" w-full m5 lg:m20 border-none
    />
  </div>
</template>
