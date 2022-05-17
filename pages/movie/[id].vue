<script setup lang="ts">
const route = useRoute()
const id = $computed(() => route.params.id as string)
const fn = useServerStateFn()

const item = await fn.getMovie(id)
</script>

<template>
  <div>
    <Hero :item="item" />

    <div>
      {{ item }}
    </div>
  </div>
</template>
