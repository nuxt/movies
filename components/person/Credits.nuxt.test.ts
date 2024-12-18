import type { VueWrapper } from '@vue/test-utils'
import type { Person } from '~/types'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { describe, expect, it } from 'vitest'
import { mockMedia, mockPerson } from '~/tests/unit/mocks'
import CreditsComponent from './Credits.vue'

async function createWrapper(item: Person) {
  const wrapper = await mountSuspended(CreditsComponent, {
    props: {
      item,
    },
  })
  return wrapper
}

describe('personCredits', () => {
  // Helper functions to get elements by data-testid
  const findPersonCreditsContainer = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-credits-container"]')
  const findActingCreditsList = (wrapper: VueWrapper) => wrapper.find('[data-testid="acting-credits-list"]')
  const findProductionCreditsList = (wrapper: VueWrapper) => wrapper.find('[data-testid="production-credits-list"]')

  it('renders acting credits list when there are acting credits', async () => {
    const item = mockPerson({
      combined_credits: {
        cast: [mockMedia()],
        crew: [],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findActingCreditsList(wrapper).exists()).toBe(true)
    expect(findProductionCreditsList(wrapper).exists()).toBe(false)
  })

  it('renders production credits list when there are production credits', async () => {
    const item = mockPerson({
      combined_credits: {
        cast: [],
        crew: [mockMedia({ title: 'Production 1' })],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findActingCreditsList(wrapper).exists()).toBe(false)
    expect(findProductionCreditsList(wrapper).exists()).toBe(true)
  })

  it('renders both acting and production credits lists when there are both', async () => {
    const item = mockPerson({
      combined_credits: {
        cast: [mockMedia()],
        crew: [mockMedia({ title: 'Production 1' })],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findActingCreditsList(wrapper).exists()).toBe(true)
    expect(findProductionCreditsList(wrapper).exists()).toBe(true)
  })

  it('renders neither list when there are no credits', async () => {
    const item = mockPerson({
      combined_credits: {
        cast: [],
        crew: [],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findPersonCreditsContainer(wrapper).exists()).toBe(true)
    expect(findActingCreditsList(wrapper).exists()).toBe(false)
    expect(findProductionCreditsList(wrapper).exists()).toBe(false)
  })
})
