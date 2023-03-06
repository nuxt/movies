<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number
  }>(),
  {
    value: 0,
  },
)

const style = computed(() => ({
  'clip-path': `inset(0 ${(10 - props.value) * 10}% 0 0)`,
}))
</script>

<template>
  <div relative aspect="11/2" filter-hue-rotate-320deg>
    <img src="/stars.webp" absolute inset-0 aria-hidden="true">
    <img src="/stars-filled.webp" absolute inset-0 aria-hidden="true" :style="style">
  </div>
</template>
