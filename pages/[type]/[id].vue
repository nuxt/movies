<script setup lang="ts">
import type { ItemType } from '~/types'

const route = useRoute()
const type = $computed(() => route.params.type as ItemType || 'movie')
const id = $computed(() => route.params.id as string)
const fn = useServerFunctions()

const item = await fn.getItem(type, id)
</script>

<template>
  <div>
    <Hero :item="item" />

    <MovieOverview :item="item" :type="type" />
    <pre>
      {{ item }}
    </pre>
  </div>
</template>
