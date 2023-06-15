<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  type: MediaType
  item: Media
}>()
</script>

<template>
  <NuxtLink
    :to="`/${item.media_type || type}/${item.id}`" pb2
  >
    <div
      block bg-gray4:10 p1
      class="aspect-10/16"
      transition duration-400
      hover="scale-105 z10"
    >
      <NuxtImg
        v-if="item.poster_path"
        width="400"
        height="600"
        format="webp"
        :src="`/tmdb${item.poster_path}`"
        :alt="item.title || item.name"
        w-full h-full object-cover
        :style="{ 'view-transition-name': `item-${item.id}` }"
      />
      <div v-else h-full op10 flex>
        <div i-ph:question ma text-4xl />
      </div>
    </div>
    <div mt-2>
      {{ item.title || item.name }}
    </div>
    <div flex text-sm gap-2 items-center>
      <StarsRate w-20 :value="item.vote_average" />
      <div op60>
        {{ item.vote_average }}
      </div>
    </div>
  </NuxtLink>
</template>
