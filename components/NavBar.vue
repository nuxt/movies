<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()

const route = useRoute()
</script>

<template>
  <div p5 justify-evenly items-center border="r base" flex="row lg:col">
    <RouterLink v-slot="{ isActive }" to="/">
      <div
        text-3xl
        :class="isActive ? 'i-fluent:home-24-filled' : 'i-fluent:home-24-regular'"
      />
    </RouterLink>
    <RouterLink v-slot="{ isActive }" to="/movie">
      <div
        text-3xl
        :class="isActive ? 'i-fluent:movies-and-tv-24-filled' : 'i-fluent:movies-and-tv-24-regular'"
      />
    </RouterLink>
    <RouterLink v-slot="{ isActive }" to="/tv">
      <div
        text-3xl
        :class="isActive ? 'i-fluent:tv-24-filled' : 'i-fluent:tv-24-regular'"
      />
    </RouterLink>
  </div>
</template>
