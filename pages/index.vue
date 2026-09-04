<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const type: MediaType = 'movie'

const queries = [
  QUERY_LIST.movie[0],
  QUERY_LIST.tv[0],
] as const

const list = await listMedia(type, queries[0].query, 1)
const firstItem = list.results[0]
const item = firstItem ? await getMedia(type, firstItem.id) : undefined
</script>

<template>
  <div>
    <template v-if="item">
      <NuxtLink :to="`/${type}/${item.id}`">
        <MediaHero :item="item" />
      </NuxtLink>
    </template>
    <CarouselAutoQuery
      v-for="(query, index) of queries"
      :key="query.type + query.query"
      :query="query"
      :priority="index === 0"
    />
    <TheFooter />
  </div>
</template>
