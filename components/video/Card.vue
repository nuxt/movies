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
  <button pb2 text-left @click="play()">
    <div
      block bg-gray4:10 p1 flex
      class="aspect-16/9"
      transition duration-400 relative
      hover="scale-102 z10"
    >
      <NuxtImg
        :src="`/youtube/vi/${item.key}/maxresdefault.jpg`"
        width="400"
        height="600"
        format="webp"
        :alt="props.item.name"
        w-full h-full object-cover
      />
      <div flex w-full h-full absolute inset-0 op20 hover:op100 transition>
        <div i-ph-play ma text-3xl />
      </div>
    </div>
    <div mt-2>
      {{ props.item.name }}
    </div>
    <div op60 text-sm>
      {{ props.item.type }}
    </div>
  </button>
</template>
