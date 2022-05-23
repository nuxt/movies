<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()

const route = useRoute()
</script>

<template>
  <div py5 lg:px5 justify-evenly items-center border="t lg:r base" flex="row lg:col" bg-black>
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
    <RouterLink v-slot="{ isActive }" to="/search">
      <div
        text-2xl
        :class="isActive ? 'i-ph-magnifying-glass-fill text-primary' : 'i-ph-magnifying-glass'"
      />
    </RouterLink>
  </div>
</template>
