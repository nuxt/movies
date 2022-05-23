<script setup lang="ts">
import type { Person } from '~/types'

defineProps<{
  item: Person
}>()
</script>

<template>
  <PersonInfo :item="item" />
  <MediaGrid>
    <template
      v-for="i of item.combined_credits?.cast"
      :key="i.id"
    >
      <MediaCard
        v-if="i.release_date"
        :item="i"
        type="movie"
      />
    </template>
  </MediaGrid>
</template>
