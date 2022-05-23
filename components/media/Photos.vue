<script setup lang="ts">
import type { Media } from '~/types'

defineProps<{
  item: Media
}>()
</script>

<template>
  <div px16 py8 gap6>
    <div row gap-2 items-baseline>
      <h3 text-2xl>
        Backdrops
      </h3>
      <div text-sm op50>
        {{ item.images?.backdrops.length }} images
      </div>
    </div>
    <div grid="~ cols-minmax-20rem" gap4>
      <PhotoCard
        v-for="i of item.images?.backdrops"
        :key="i.file_path"
        :item="i"
        class="aspect-16/9"
        w-full
      />
    </div>
    <div mt-10 row gap-2 items-baseline>
      <h3 text-2xl>
        Posters
      </h3>
      <div text-sm op50>
        {{ item.images?.posters.length }} images
      </div>
    </div>
    <div grid="~ cols-minmax-15rem" gap4>
      <PhotoCard
        v-for="i of item.images?.posters"
        :key="i.file_path"
        :item="i"
        class="aspect-9/16"
      />
    </div>
  </div>
</template>
