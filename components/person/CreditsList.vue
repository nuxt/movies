<script setup lang="ts">
import type { Media } from '~/types'

const props = defineProps<{
  items: Media[]
  title: string
}>()

const credits = [...props.items]
  .sort((a, b) => (b.release_date || b.first_air_date || '9999')
    .localeCompare(a.release_date || a.first_air_date || '9999'))
</script>

<template>
  <div flex="~ col" gap1>
    <h2 text-2xl pb4>
      {{ title }}
    </h2>
    <NuxtLink
      v-for="i of credits"
      :key="i.id"
      :to="`/${i.media_type}/${i.id}`"
      flex="col" gap2 px2 py3 bg-gray:5
    >
      <div text-center w-20 tabular-nums>
        {{ i.release_date ? i.release_date.slice(0, 4) : i.first_air_date ? i.first_air_date.slice(0, 4) : '-' }}
      </div>
      <div>{{ i.title || i.name }}</div>
      <div op50>
        {{ i.character ? $t('as {character}', { character: i.character }) : '' }}
      </div>
    </NuxtLink>
  </div>
</template>
