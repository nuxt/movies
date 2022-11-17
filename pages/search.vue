<script setup lang="ts">
import type { Media } from '~/types'

const route = useRoute()
const router = useRouter()
const input = $ref((route.query.s || '').toString())
let error = $ref<unknown>()
let count = $ref<undefined | number>()

let items = $ref<Media[]>([])
let currentSearch = $ref(input)

function search() {
  if (currentSearch === input)
    return
  currentSearch = input
  count = undefined
  items = []
  router.replace({ query: { s: input } })
}

async function fetch(page: number) {
  if (!currentSearch)
    return
  try {
    const data = await searchShows(currentSearch, page)
    count = data.total_results ?? count
    items.push(...data.results)
  }
  catch (e: any) {
    error = e
  }
}

const throttledSearch = useDebounceFn(search, 200)

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

useHead({
  title: computed(() => `Search: ${currentSearch}`),
})

watch(
  () => input,
  () => throttledSearch(),
)
</script>

<template>
  <div>
    <div flex bg-gray:10 items-center px6 py4 gap3 sticky>
      <div i-ph:magnifying-glass text-xl op50 />
      <input
        v-model="input"
        v-focus
        type="text"
        text-2xl bg-transparent outline-none
        :placeholder="$t('Type to search...')"
        @keyup.enter="search"
      >
    </div>
    <div v-if="error" p8 flex flex-col gap-3 items-start>
      <h1 text-4xl text-red>
        {{ $t('Error occurred on fetching') }}
      </h1>
      <pre py2>{{ error }}</pre>
      <button n-link border px4 py1 rounded @click="error = undefined">
        {{ $t('Retry') }}
      </button>
    </div>
    <MediaAutoLoadGrid
      v-else-if="currentSearch"
      :key="currentSearch"
      :fetch="fetch"
      :items="items"
      :count="count"
      type="movie"
    >
      <div>{{ $t('Search result for: {currentSearch}', { currentSearch }) }}</div>
    </MediaAutoLoadGrid>
    <div v-else text-4xl p10 font-100 op50 text-center>
      {{ $t('Type something to search...') }}
    </div>
  </div>
</template>
