<script setup lang="ts">
import type { Person } from '~/types'

const { item } = defineProps<{
  item: Person
}>()
</script>

<template>
  <div px16 gap5>
    <PersonCreditsList
      v-if="item.combined_credits?.cast?.length"
      title="Acting"
      :items="item.combined_credits.cast"
    />
    <PersonCreditsList
      v-if="item.combined_credits?.crew?.length"
      title="Production"
      :items="item.combined_credits.crew"
    />
  </div>
</template>
