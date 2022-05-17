<script setup lang="ts">
const fn = useServerStateFn()
const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
  fn.getMovies('popular', 1),
  fn.getMovies('top_rated', 1),
  fn.getMovies('upcoming', 1),
  fn.getMovies('now_playing', 1),
])
const featured = $computed(() => upcoming.results[0])
</script>

<template>
  <div>
    <Hero :item="featured" />
    <div row py3 px10 items-center mt5>
      <h3 text-lg font-bold>
        Popular
      </h3>
      <div flex-auto />
      <NuxtLink to="/movie/category/popular">
        Explore more
      </NuxtLink>
    </div>
    <ListingCarousel :items="popular.results" />
    <div row py3 px10 items-center mt5>
      <h3 text-lg font-bold>
        Top Rated
      </h3>
      <div flex-auto />
      <NuxtLink to="/movie/category/top_rated">
        Explore more
      </NuxtLink>
    </div>
    <ListingCarousel :items="topRated.results" />
    <div row py3 px10 items-center mt5>
      <h3 text-lg font-bold>
        Upcoming
      </h3>
      <div flex-auto />
      <NuxtLink to="/movie/category/upcoming">
        Explore more
      </NuxtLink>
    </div>
    <ListingCarousel :items="upcoming.results" />
    <div row py3 px10 items-center mt5>
      <h3 text-lg font-bold>
        Now Playing
      </h3>
      <div flex-auto />
      <NuxtLink to="/movie/category/now_playing">
        Explore more
      </NuxtLink>
    </div>
    <ListingCarousel :items="nowPlaying.results" />
  </div>
</template>
