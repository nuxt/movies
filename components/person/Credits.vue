<script setup lang="ts">
import type { Person } from '~/types'

const props = withDefaults(defineProps<{
  item: Person
}>(), {
  item: () => ({} as Person),
})
</script>

<template>
  <div flex="~ col" px16 gap5 data-testid="person-credits-container">
    <PersonCreditsList
      v-if="props.item.combined_credits?.cast?.length"
      :title="$t('Acting Credits')"
      :items="props.item.combined_credits.cast"
      data-testid="acting-credits-list"
    />
    <PersonCreditsList
      v-if="props.item.combined_credits?.crew?.length"
      :title="$t('Production Credits')"
      :items="props.item.combined_credits.crew"
      data-testid="production-credits-list"
    />
  </div>
</template>
