<script setup lang="ts">
import type { Person } from '~/types'

defineProps<{
  item: Person
}>()
</script>

<template>
  <div flex="~ col" px16 gap6 data-testid="person-photos-container">
    <div flex mt-10 gap-2 items-baseline>
      <div text-2xl data-testid="person-photos-title">
        {{ $t('Person Photos') }}
      </div>
      <div text-sm op50 data-testid="number-of-images">
        {{ $t('{numberOfImages} Images', { numberOfImages: item.images?.profiles?.length }) }}
      </div>
    </div>
    <div grid="~ cols-minmax-10rem lg:cols-minmax-15rem" gap4 data-testid="photos-grid">
      <PhotoCard
        v-for="i of item.images?.profiles"
        :key="i.file_path"
        :item="i"
        class="aspect-9/16"
        data-testid="photo-card"
      />
    </div>
  </div>
</template>
