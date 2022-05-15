import { defineStore } from 'pinia'
import type { Movie } from '~/types'

type Category = 'movie' | 'tv'
type FilterType = string

interface PageInfo {
  total_pages: number
  total_results: number
  pages: Movie[][]
}

export interface Store {
  pages: Record<Category, Record<FilterType, PageInfo>>
}

export const useStore = defineStore('store', () => {
  const store: Store = reactive({
    pages: {
      movie: {},
      tv: {},
    },
  })

  async function getPage(cate: Category, filter: FilterType, page: number) {
    if (!(cate in store.pages))
      store.pages[cate] = {}
    if (!(filter in store.pages[cate])) {
      store.pages[cate][filter] = {
        total_pages: 0,
        total_results: 0,
        pages: [],
      }
    }

    const info = store.pages[cate][filter]

    if (info.pages[page])
      return info.pages[page]

    const data = await functions.get.getMovies(filter, page)

    info.total_pages = data.total_pages
    info.total_results = data.total_results
    info.pages[page] = data.results
    return data.results
  }

  return {
    ...toRefs(store),
    getPage,
  }
})
