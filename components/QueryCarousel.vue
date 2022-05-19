<script setup lang="ts">
import type { QueryItem } from '~/types'

const { query } = defineProps<{
  query: QueryItem
}>()

const fn = useServerFunctions()

const item = await fn.getItems(query.type, query.query, 1)
</script>

<template>
  <div row py3 px10 items-center mt5>
    <h3 text-lg font-bold>
      {{ query.title }}
    </h3>
    <div flex-auto />
    <NuxtLink :to="`/${query.type}/category/${query.query}`">
      Explore more
    </NuxtLink>
  </div>
  <ListingCarousel :items="item.results" :type="query.type" />
</template>
