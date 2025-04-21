import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import { mockMedia } from '~/tests/unit/mocks'
import CreditsList from './CreditsList.vue'

describe('creditsList', () => {
  // Helper functions to get elements by data-testid
  const getTitle = (wrapper: VueWrapper) => wrapper.find('[data-testid="credits-title"]')
  const getCreditItems = (wrapper: VueWrapper) => wrapper.findAll('[data-testid="credit-item"]')
  const getCreditDate = (item: DOMWrapper<Element>) => item.find('[data-testid="credit-date"]')
  const getCreditTitle = (item: DOMWrapper<Element>) => item.find('[data-testid="credit-title"]')
  const getCreditCharacter = (item: DOMWrapper<Element>) => item.find('[data-testid="credit-character"]')

  it('renders the title', async () => {
    const wrapper = await mountSuspended(CreditsList, {
      props: {
        items: [],
        title: 'Test Title',
      },
    })

    expect(getTitle(wrapper).text()).toBe('Test Title')
  })

  it('renders credit items correctly', async () => {
    const items = [
      mockMedia({ id: '1', title: 'Movie 1', release_date: '2023-01-01', media_type: 'movie' }),
      mockMedia({ id: '2', name: 'TV Show 1', first_air_date: '2022-01-01', media_type: 'tv' }),
    ]

    const wrapper = await mountSuspended(CreditsList, {
      props: {
        items,
        title: 'Credits',
      },
    })

    const creditItems = getCreditItems(wrapper)

    expect(creditItems.length).toBe(2)

    expect(getCreditDate(creditItems[0]).text()).toBe('2023')
    expect(getCreditTitle(creditItems[0]).text()).toBe('Movie 1')
    expect(getCreditCharacter(creditItems[0]).text()).toBe('')

    expect(getCreditDate(creditItems[1]).text()).toBe('2022')
    expect(getCreditTitle(creditItems[1]).text()).toBe('TV Show 1')
    expect(getCreditCharacter(creditItems[1]).text()).toBe('')
  })

  it('sorts items by release date', async () => {
    const items = [
      mockMedia({ id: '1', title: 'Movie 1', release_date: '2023-01-01', media_type: 'movie' }),
      mockMedia({ id: '2', title: 'Movie 2', release_date: '2024-01-01', media_type: 'movie' }),
      mockMedia({ id: '3', title: 'Movie 3', release_date: undefined, first_air_date: '2022-03-01', media_type: 'movie' }),
      mockMedia({ id: '4', title: 'Movie 4', release_date: undefined, first_air_date: '2022-08-01', media_type: 'movie' }),
    ]

    const wrapper = await mountSuspended(CreditsList, {
      props: {
        items,
        title: 'Credits',
      },
    })

    const creditItems = getCreditItems(wrapper)

    expect(getCreditTitle(creditItems[0]).text()).toBe('Movie 2')
    expect(getCreditTitle(creditItems[1]).text()).toBe('Movie 1')
    expect(getCreditTitle(creditItems[2]).text()).toBe('Movie 4')
    expect(getCreditTitle(creditItems[3]).text()).toBe('Movie 3')
  })

  it('renders credit items with name instead of title', async () => {
    const items = [
      mockMedia({ id: '1', name: 'TV Show 1', first_air_date: '2022-01-01', media_type: 'tv' }),
    ]

    const wrapper = await mountSuspended(CreditsList, {
      props: {
        items,
        title: 'Credits',
      },
    })

    const creditItems = getCreditItems(wrapper)

    expect(creditItems.length).toBe(1)

    expect(getCreditDate(creditItems[0]).text()).toBe('2022')
    expect(getCreditTitle(creditItems[0]).text()).toBe('TV Show 1')
    expect(getCreditCharacter(creditItems[0]).text()).toBe('')
  })

  it('renders credit items with character', async () => {
    const items = [
      mockMedia({ id: '1', title: 'Movie 1', release_date: '2023-01-01', media_type: 'movie', character: 'Hero' }),
    ]

    const wrapper = await mountSuspended(CreditsList, {
      props: {
        items,
        title: 'Credits',
      },
    })

    const creditItems = getCreditItems(wrapper)

    expect(creditItems.length).toBe(1)

    expect(getCreditDate(creditItems[0]).text()).toBe('2023')
    expect(getCreditTitle(creditItems[0]).text()).toBe('Movie 1')
    expect(getCreditCharacter(creditItems[0]).text()).toBe('as Hero')
  })
})
