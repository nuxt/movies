<script setup lang="ts">
const popular = await functions.get.getMovies('popular')
</script>

<template>
  <div>
    <div overflow-y-auto>
      <div row gap-2 w-max p-2>
        <RouterLink
          v-for="i of popular.results"
          :key="i.id"
          :to="`/movie/${i.id}`"
        >
          <MovieItem :item="i" flex-1 w-50 />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
