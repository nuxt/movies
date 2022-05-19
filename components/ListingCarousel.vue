<script setup lang="ts">
import type { ItemType, Movie } from '~/types'

defineProps<{
  type: ItemType
  items: Movie[]
}>()

const scrollEl = $ref<HTMLDivElement>()

function scrollLeft() {
  scrollEl?.scrollTo({
    left: 0,
    behavior: 'smooth',
  })
}
function scrollRight() {
  scrollEl?.scrollTo({
    left: scrollEl?.scrollWidth - scrollEl?.clientWidth,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div relative>
    <div ref="scrollEl" overflow-y-auto>
      <div row gap-2 w-max p-2 px-10>
        <MovieItem
          v-for="i of items"
          :key="i.id"
          :item="i"
          :type="type"
          flex-1 w-60
        />
      </div>
    </div>
    <button
      absolute top-0 left-0 bottom-0 bg-black:50 p3 items-center justify-center op0 hover:op100 transition
      @click="scrollLeft()"
    >
      <div i-fluent:chevron-left-24-regular text-3xl text-white />
    </button>
    <button
      absolute top-0 right-0 bottom-0 bg-black:50 p3 items-center justify-center op0 hover:op100 transition
      @click="scrollRight()"
    >
      <div i-fluent:chevron-right-24-regular text-3xl text-white />
    </button>
  </div>
</template>
