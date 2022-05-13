<script setup lang="ts">
const popular = await rpc.getMovies('popular')
</script>

<template>
  <div>
    {{ popular }}
  </div>
</template>
