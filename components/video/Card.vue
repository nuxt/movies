<script setup lang="ts">
import type { Video } from '~/types'

const props = defineProps<{
  item: Video
}>()

const showModal = useIframeModal()
function play() {
  return showModal(getVideoLink(props.item)!)
}
</script>

<template>
  <button pb2 text-left data-testid="play-button" @click="play()">
    <div
      block bg-gray4:10 p1 flex
      class="aspect-16/9"
      transition duration-400 relative
      hover="scale-102 z10"
      data-testid="video-thumbnail"
    >
      <NuxtImg
        :src="`/youtube/vi/${item.key}/maxresdefault.jpg`"
        width="400"
        height="600"
        format="webp"
        :alt="props.item.name"
        w-full h-full object-cover
        data-testid="video-image"
      />
      <div flex w-full h-full absolute inset-0 op20 hover:op100 transition>
        <div i-ph-play ma text-3xl data-testid="play-icon" />
      </div>
    </div>
    <div mt-2 data-testid="video-name">
      {{ props.item.name }}
    </div>
    <div op60 text-sm data-testid="video-type">
      {{ props.item.type }}
    </div>
  </button>
</template>
