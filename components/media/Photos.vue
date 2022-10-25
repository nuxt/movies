<script setup lang="ts">
import type { Media } from '~/types'

defineProps<{
  item: Media
}>()

const show = useImageModal()
</script>

<template>
  <div flex="~ col" px4 md:px16 py8 gap6>
    <div flex gap-2 items-baseline>
      <div text-2xl>
        Backdrops
      </div>
      <div text-sm op50>
        {{ item.images?.backdrops.length }} images
      </div>
    </div>
    <div grid="~ cols-minmax-20rem" gap4>
      <PhotoCard
        v-for="i, idx of item.images?.backdrops"
        :key="i.file_path"
        :item="i"
        class="aspect-16/9"
        w-full
        @click="show(item.images!.backdrops, idx)"
      />
    </div>
    <div flex mt-10 gap-2 items-baseline>
      <div text-2xl>
        Posters
      </div>
      <div text-sm op50>
        {{ item.images?.posters.length }} images
      </div>
    </div>
    <div grid="~ cols-minmax-15rem" gap4>
      <PhotoCard
        v-for="i, idx of item.images?.posters"
        :key="i.file_path"
        :item="i"
        class="aspect-9/16"
        @click="show(item.images!.posters, idx)"
      />
    </div>
  </div>
</template>
