<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType)
  },
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')

useHead({
  title: type.value === 'movie' ? 'Movies' : 'TV Shows',
})

const queries = computed(() => QUERY_LIST[type.value as MediaType])

const AsyncWrapper = defineComponent(async (_, ctx) => {
  if (!queries.value)
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

  const list = await listMedia(type.value, queries.value?.[0].query, 1)
  if (!list)
    return () => {}
  const item = await getMedia(type.value, list.results?.[0].id)
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
    <TheFooter />
  </div>
</template>
