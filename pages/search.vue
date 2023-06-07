<script setup lang="ts">
import type { Media } from '~/types'

definePageMeta({
  pageTransition: false,
})

const route = useRoute()
const router = useRouter()
const input = ref((route.query.s || '').toString())
const error = ref<unknown>()
const count = ref<undefined | number>()

const items = ref<Media[]>([])
const currentSearch = ref(input.value)

function search() {
  if (currentSearch.value === input.value)
    return

  currentSearch.value = input.value.toString()
  count.value = undefined
  items.value = []
  router.replace({ query: { s: input.value } })
}

async function fetch(page: number) {
  if (!currentSearch.value)
    return
  try {
    const data = await searchShows(currentSearch.value, page)
    count.value = data.total_results ?? count.value
    items.value.push(...data.results)
  }
  catch (e: any) {
    error.value = e
  }
}

const throttledSearch = useDebounceFn(search, 200)

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

useHead({
  title: computed(() => `Search: ${currentSearch.value}`),
})

watch(
  () => input.value,
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
        text-2xl bg-transparent outline-none w-full
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
      :blocking="false"
      type="movie"
    >
      <div>{{ $t('Search result for: {currentSearch}', { currentSearch }) }}</div>
    </MediaAutoLoadGrid>
    <div v-else text-4xl p10 font-100 op50 text-center>
      {{ $t('Type something to search...') }}
    </div>
  </div>
</template>
