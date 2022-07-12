<script setup lang="ts">
import type { Image } from '~/types'
import { TMDB_IMAGE_BASE_THUMBNAIL } from '~/constants/images'

const { item } = defineProps<{
  item: Image
}>()
</script>

<template>
  <button
    text-left block
    bg-gray4:10 transition
    duration-400 relative hover="scale-102 z10"
    title="View photo"
  >
    <NuxtImg
      :src="TMDB_IMAGE_BASE_THUMBNAIL + item.file_path"
      alt="Photo"
      w-full h-full object-cover
    />
  </button>
</template>
