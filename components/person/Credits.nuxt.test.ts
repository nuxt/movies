import type { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { Media, Person } from '~/types'
import CreditsComponent from './Credits.vue'

// Helper Functions
async function createWrapper(item: Person) {
  const wrapper = await mountSuspended(CreditsComponent, {
    props: {
      item,
    },
  })
  return wrapper
}

function createMockPerson(overrides: Partial<Person> = {}): Person {
  return {
    adult: false,
    gender: 1,
    id: 1,
    known_for_department: 'Acting',
    name: 'John Doe',
    original_name: 'John Doe',
    profile_path: '/path/to/profile.jpg',
    popularity: 10,
    credit_id: 'credit_1',
    order: 1,
    combined_credits: {
      cast: [],
      crew: [],
    },
    ...overrides,
  }
}

function createMockMedia(overrides: Partial<Media> = {}): Media {
  return {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: '1',
    original_language: 'en',
    original_title: 'Movie 1',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: 'Movie 1',
    video: false,
    vote_average: 0,
    vote_count: 0,
    ...overrides,
  }
}

describe('personCredits', () => {
  // Helpers
  const findPersonCreditsContainer = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-credits-container"]')
  const findActingCreditsList = (wrapper: VueWrapper) => wrapper.find('[data-testid="acting-credits-list"]')
  const findProductionCreditsList = (wrapper: VueWrapper) => wrapper.find('[data-testid="production-credits-list"]')

  it('renders acting credits list when there are acting credits', async () => {
    const item = createMockPerson({
      combined_credits: {
        cast: [createMockMedia()],
        crew: [],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findActingCreditsList(wrapper).exists()).toBe(true)
    expect(findProductionCreditsList(wrapper).exists()).toBe(false)
  })

  it('renders production credits list when there are production credits', async () => {
    const item = createMockPerson({
      combined_credits: {
        cast: [],
        crew: [createMockMedia({ title: 'Production 1' })],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findActingCreditsList(wrapper).exists()).toBe(false)
    expect(findProductionCreditsList(wrapper).exists()).toBe(true)
  })

  it('renders both acting and production credits lists when there are both', async () => {
    const item = createMockPerson({
      combined_credits: {
        cast: [createMockMedia()],
        crew: [createMockMedia({ title: 'Production 1' })],
      },
    })

    const wrapper = await createWrapper(item)

    expect(findActingCreditsList(wrapper).exists()).toBe(true)
    expect(findProductionCreditsList(wrapper).exists()).toBe(true)
  })

  it('renders neither list when there are no credits', async () => {
    const item = createMockPerson({
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
