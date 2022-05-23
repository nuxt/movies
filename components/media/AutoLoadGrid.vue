<script setup lang="ts">
import type { Media, MediaType } from '~/types'

const props = defineProps<{
  items: Media[]
  type: MediaType
  fetch: (page: number) => Promise<void>
}>()

const tailEl = ref<HTMLDivElement>()

let page = 0
let isLoading = $ref(false)

async function loadingNext() {
  if (isLoading)
    return
  isLoading = true
  try {
    page += 1
    await props.fetch(page)
  }
  finally {
    isLoading = false
  }
}

await loadingNext()

if (process.client) {
  useIntervalFn(() => {
    if (!tailEl.value || isLoading)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 400)
      loadingNext()
  }, 500)
}
</script>

<template>
  <div>
    <h1 flex="~" px8 pt8 gap2 text-3xl>
      <slot />
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
