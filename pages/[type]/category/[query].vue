<script setup lang="ts">
import type { Media, MediaType } from '~/types'

const route = useRoute()
const query = $computed(() => route.params.query as string)
const type = $computed(() => route.params.type as MediaType || 'movie')
const tailEl = ref<HTMLDivElement>()

let page = $ref(0)
const items: Media[] = reactive([])

let isLoading = $ref(false)

const fn = useServerFunctions()

async function loadingNext() {
  if (isLoading)
    return
  isLoading = true
  items.push(...(await fn.getItems(type, query, page + 1)).results)
  page += 1
  isLoading = false
}

await loadingNext()

if (process.client) {
  const { top } = useElementBounding(tailEl)
  watch(top, () => {
    const delta = top.value - window.innerHeight
    if (delta < 300)
      loadingNext()
  })
}
</script>

<template>
  <div>
    <h1 flex="~" px8 pt8 gap2 text-3xl>
      <span case-capital>{{ query }}</span>
      <span>{{ type === 'tv' ? 'TV' : 'Movies' }}</span>
    </h1>
    <MediaGrid>
      <MediaCard
        v-for="item of items"
        :key="item.id"
        :type="type"
        :item="item"
      />
    </MediaGrid>
    <div ref="tailEl" />
    <div v-if="isLoading" p10 animate-pulse>
      <div i-carbon:circle-dash text-4xl ma animate-spin />
    </div>
  </div>
</template>
