<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

let src = $ref<string | null>(null)

function showModal(link: string) {
  src = link
}

provideIframeModal(showModal)

onKeyDown('Escape', () => {
  if (src)
    src = null
})
</script>

<template>
  <div v-if="src" fixed top-0 left-0 right-0 bottom-0 z-10 bg-black:90>
    <button absolute top-1 right-1 z-100 p3 text-3xl n-link bg-black:60 rounded-full @click="src = null">
      <div i-carbon-close />
    </button>
    <iframe
      allow="autoplay; encrypted-media"
      allowfullscreen
      :src="src" h-full m5 lg:m20 border-none
    />
  </div>
</template>
