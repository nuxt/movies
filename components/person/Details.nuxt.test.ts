import type { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import { mockMedia, mockPerson } from '~/tests/unit/mocks'
import PersonDetails from './Details.vue'

describe('personDetails', () => {
  // Helper functions to get elements by data-testid
  const getTabKnown = (wrapper: VueWrapper) => wrapper.find('[data-testid="tab-known"]')
  const getTabCredits = (wrapper: VueWrapper) => wrapper.find('[data-testid="tab-credits"]')
  const getTabPhotos = (wrapper: VueWrapper) => wrapper.find('[data-testid="tab-photos"]')
  const getMediaGrid = (wrapper: VueWrapper) => wrapper.find('[data-testid="media-grid"]')
  const getMediaCards = (wrapper: VueWrapper) => wrapper.findAll('[data-testid="media-card"]')
  const getPersonCredits = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-credits"]')
  const getPersonPhotos = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-photos"]')

  it('renders the tabs', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonDetails, {
      props: { item },
    })

    expect(getTabKnown(wrapper).exists()).toBe(true)
    expect(getTabCredits(wrapper).exists()).toBe(true)
    expect(getTabPhotos(wrapper).exists()).toBe(true)
  })

  it('renders the media grid when "Known For" tab is selected', async () => {
    const item = mockPerson({
      combined_credits: {
        cast: [mockMedia({ id: '1', title: 'Movie 1', release_date: '2023-01-01' })],
        crew: [],
      },
    })

    const wrapper = await mountSuspended(PersonDetails, {
      props: { item },
    })

    await getTabKnown(wrapper).trigger('click')

    expect(getMediaGrid(wrapper).exists()).toBe(true)
    expect(getMediaCards(wrapper).length).toBe(1)
  })

  it('renders the person credits when "Credits" tab is selected', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonDetails, {
      props: { item },
    })

    await getTabCredits(wrapper).trigger('click')

    expect(getPersonCredits(wrapper).exists()).toBe(true)
  })

  it('renders the person photos when "Photos" tab is selected', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonDetails, {
      props: { item },
    })

    await getTabPhotos(wrapper).trigger('click')

    expect(getPersonPhotos(wrapper).exists()).toBe(true)
  })
})
