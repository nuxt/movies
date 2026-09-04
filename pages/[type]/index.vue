<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return 'type' in params && ['movie', 'tv'].includes(params.type as MediaType)
  },
})

const route = useRoute('type')
const type = computed(() => route.params.type as MediaType)

useHead({
  title: type.value === 'movie' ? 'Movies' : 'TV Shows',
})

const queries = computed(() => QUERY_LIST[type.value as MediaType])
const list = await listMedia(type.value, queries.value[0].query, 1)
const firstItem = list.results[0]
const item = firstItem ? await getMedia(type.value, firstItem.id) : undefined
</script>

<template>
  <div>
    <NuxtLink v-if="item" :to="`/${type}/${item.id}`">
      <MediaHero :item="item" />
    </NuxtLink>
    <CarouselAutoQuery
      v-for="(query, index) of queries"
      :key="query.type + query.query"
      :query="query"
      :priority="index === 0"
    />
    <TheFooter />
  </div>
</template>
