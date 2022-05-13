<script setup lang="ts">
const popular = await rpc.getMovies('popular')
</script>

<template>
  <div>
    <div overflow-y-auto>
      <div row gap-2 w-max p-2>
        <MovieItem
          v-for="i of popular.results"
          :key="i.id"
          :item="i"
          flex-1 w-50
        />
      </div>
    </div>
  </div>
</template>
