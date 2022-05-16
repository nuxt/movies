<script setup lang="ts">
const fn = useServerFn()
const popular = await fn.getMovies('popular', 1)
const topRated = await fn.getMovies('top_rated', 1)
const upcoming = await fn.getMovies('upcoming', 1)
const nowPlaying = await fn.getMovies('now_playing', 1)
const featured = $computed(() => upcoming.results[0])
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
