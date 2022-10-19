<script setup lang="ts">
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
  <div flex py3 px10 items-center mt5>
    <div text-2xl>
      <slot name="title" />
    </div>
    <div flex-auto />
    <slot name="more" />
  </div>
  <div relative>
    <div ref="scrollEl" overflow-y-auto>
      <div flex gap-2 w-max p-2 px-10>
        <slot />
      </div>
    </div>
    <button
      flex="~ col" absolute top-0 left-0 bottom-0 bg-black:50 p3 items-center justify-center op0 hover:op100 transition
      title="Scroll left"
      @click="scrollLeft()"
    >
      <div i-ph-caret-left-light text-3xl text-white />
    </button>
    <button
      flex="~ col" absolute top-0 right-0 bottom-0 bg-black:50 p3 items-center justify-center op0 hover:op100 transition
      title="Scroll right"
      @click="scrollRight()"
    >
      <div i-ph-caret-right-light text-3xl text-white />
    </button>
  </div>
</template>
