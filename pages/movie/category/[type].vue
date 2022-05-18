<script setup lang="ts">
import type { Movie } from '~/types'

const route = useRoute()
const type = route.params.type as string
const tailEl = ref<HTMLDivElement>()

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

const fn = useServerFunctions()

async function loadingNext() {
  if (isLoading)
    return
  isLoading = true
  items.push(...(await fn.getMovies(type, page + 1)).results)
  page += 1
  isLoading = false
}

await loadingNext()
</script>

<template>
  <div>
    <div grid="~ cols-3 md:cols-5 lg:cols-7" gap-4 p4>
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
