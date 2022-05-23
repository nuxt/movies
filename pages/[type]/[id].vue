<script setup lang="ts">
import type { MediaType } from '~/types'

const route = useRoute()
const type = $computed(() => route.params.type as MediaType || 'movie')
const id = $computed(() => route.params.id as string)
const fn = useServerFunctions()

const item = await fn.getMedia(type, id)
</script>

<template>
  <div>
    <MediaHero :item="item" />
    <MediaDetails :item="item" :type="type" />
  </div>
</template>
