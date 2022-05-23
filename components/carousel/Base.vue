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
  <div row py3 px10 items-center mt5>
    <h3 text-2xl>
      <slot name="title" />
    </h3>
    <div flex-auto />
    <slot name="more" />
  </div>
  <div relative>
    <div ref="scrollEl" overflow-y-auto>
      <div row gap-2 w-max p-2 px-10>
        <slot />
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
