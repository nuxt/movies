<script setup lang="ts">
import type { Movie } from '~/types'

const route = useRoute()
const type = route.params.type as string
const tailEl = ref<HTMLDivElement>()

const store = useStore()

let page = $ref(0)
const items: Movie[] = reactive([])

let isLoading = $ref(false)

useEventListener('scroll', () => {
  if (!tailEl.value)
    return

  const { top } = tailEl.value.getBoundingClientRect()
  const delta = top - window.innerHeight
  if (delta < 300)
    loadingNext()
})

async function loadingNext() {
  if (isLoading)
    return
  isLoading = true
  console.log(`fetch page ${page + 1}`)
  items.push(...(await store.getPage('movie', type, page + 1)))
  page += 1
  isLoading = false
}

await loadingNext()
</script>

<template>
  <div>
    <div grid="~ cols-3" gap-4 p4>
      <MovieItem
        v-for="item of items"
        :key="item.id"
        :item="item"
      />
    </div>
    <div ref="tailEl" />
    <div v-if="isLoading" p10 animate-pulse>
      <div i-carbon:circle-dash text-4xl ma animate-spin />
    </div>
  </div>
</template>
