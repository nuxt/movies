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
        text-2xl
        :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
      />
    </RouterLink>
    <RouterLink v-slot="{ isActive }" to="/movie">
      <div
        text-2xl
        :class="isActive ? 'i-ph-film-strip-fill text-primary' : 'i-ph-film-strip'"
      />
    </RouterLink>
    <RouterLink v-slot="{ isActive }" to="/tv">
      <div
        text-2xl
        :class="isActive ? 'i-ph-television-simple-fill text-primary' : 'i-ph-television-simple'"
      />
    </RouterLink>
  </div>
</template>
