<script setup lang="ts">
import type { QueryItem } from '~/types'

const { query } = defineProps<{
  query: QueryItem
}>()

const item = await listMedia(query.type, query.query, 1)
</script>

<template>
  <CarouselBase>
    <template #title>
      {{ $t(query.title) }}
    </template>
    <template #more>
      <NuxtLink :to="`/${query.type}/category/${query.query}`" n-link>
        {{ $t('Explore more') }}
      </NuxtLink>
    </template>
    <MediaCard
      v-for="i of item.results"
      :key="i.id"
      :item="i"
      :type="query.type"
      flex-1 w-60
    />
  </CarouselBase>
</template>
