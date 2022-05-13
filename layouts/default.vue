<script setup lang="ts">
const popular = await rpc.getMovies('popular')
</script>

<template>
  <div>
    <NavBar />
    <slot />
  </div>
</template>
