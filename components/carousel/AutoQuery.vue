<script setup lang="ts">
import type { QueryItem } from '~/types'

const props = defineProps<{
  query: QueryItem
}>()

const item = await listMedia(props.query.type, props.query.query, 1)
</script>

<template>
  <CarouselBase>
    <template #title>
      {{ $t(query.title) }}
    </template>
    <template #more>
      <NuxtLink :to="`/${props.query.type}/category/${props.query.query}`" n-link>
        {{ $t('Explore more') }}
      </NuxtLink>
    </template>
    <MediaCard
      v-for="i of item?.results || []"
      :key="i.id"
      :item="i"
      :type="props.query.type"
      flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>
