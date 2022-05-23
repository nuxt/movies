<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const fn = useServerFunctions()
const route = useRoute()
const type = $computed(() => route.params.type as MediaType || 'movie')

const queries = $computed(() => QUERY_LIST[type as MediaType])
const upcoming = await fn.getItems(type, queries[0].query, 1)
const featured = $computed(() => upcoming.results[0])
</script>

<template>
  <div>
    <NuxtLink :to="`/${type}/${featured.id}`">
      <MovieHero :item="featured" />
    </NuxtLink>
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
  </div>
</template>
