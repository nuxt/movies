<script setup lang="ts">
const { data: popular } = await useAsyncData('popular', () => functions.get.getMovies('popular'))
const { data: topRated } = await useAsyncData('top_rated', () => functions.get.getMovies('top_rated'))
const { data: upcoming } = await useAsyncData('upcoming', () => functions.get.getMovies('upcoming'))
const { data: nowPlaying } = await useAsyncData('now_playing', () => functions.get.getMovies('now_playing'))
const featured = $computed(() => upcoming.value?.results[0])
</script>

<template>
  <div>
    <Hero :item="featured" />
    <ListingCarousel :items="popular.results" />
    <ListingCarousel :items="topRated.results" />
    <ListingCarousel :items="upcoming.results" />
    <ListingCarousel :items="nowPlaying.results" />
  </div>
</template>
