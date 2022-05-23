<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const fn = useServerFunctions()
const route = useRoute()
const type = $computed(() => route.params.type as MediaType || 'movie')

const queries = $computed(() => QUERY_LIST[type as MediaType])

const AsyncWrapper = defineComponent(async (_, ctx) => {
  const upcoming = await fn.getItems(type, queries[0].query, 1)
  const item = upcoming.results[0]
  return () => ctx.slots?.default?.({ item })
})
</script>

<template>
  <div>
    <AsyncWrapper>
      <template #default="{ item }">
        <NuxtLink :to="`/${type}/${item.id}`">
          <MediaHero :item="item" />
        </NuxtLink>
      </template>
    </AsyncWrapper>
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
  </div>
</template>
