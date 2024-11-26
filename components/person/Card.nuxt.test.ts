import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'

import PersonCard from './Card.vue'
import type { Person } from '~/types'

function mockPerson(overrides: Partial<Person> = {}): Person {
  return {
    adult: false,
    gender: 0,
    id: 1,
    known_for_department: '',
    name: 'John Doe',
    profile_path: '/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg',
    original_name: '',
    popularity: 0,
    credit_id: '',
    character: 'Main Character',
    order: 0,
    images: {
      profiles: [{ aspect_ratio: 0.667, height: 900, iso_639_1: 'null', file_path: '/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg', vote_average: 5.326, vote_count: 7, width: 600 }],
    },
    ...overrides,
  }
}

function initComponent(props: { item: Person }) {
  return mountSuspended(PersonCard, {
    props,
  })
}

describe('personCard', () => {
  // Helpers
  const findImage = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-image"]')
  const findName = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-name"]')
  const findCharacter = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-character"]')
  const findPlaceholder = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-placeholder"]')
  const findLink = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-link"]')

  it('renders correctly with profile image', async () => {
    const personWithProfile = mockPerson()

    const wrapper = await initComponent({ item: personWithProfile })

    expect(findImage(wrapper).exists()).toBe(true)

    expect(findImage(wrapper).attributes('src')).toBe('https://movies-proxy.vercel.app/ipx/f_webp&s_500x800/tmdb/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg')
    expect(findImage(wrapper).attributes('alt')).toBe('John Doe')

    expect(findName(wrapper).text()).toBe('John Doe')

    expect(findCharacter(wrapper).text()).toBe('Main Character')
  })

  it('renders correctly without profile image', async () => {
    const personWithoutProfile = mockPerson({ profile_path: '', name: 'Jane Doe', character: 'Supporting Character', id: 2 })
    const wrapper = await initComponent({ item: personWithoutProfile })

    expect(findImage(wrapper).exists()).toBe(false)

    expect(findPlaceholder(wrapper).exists()).toBe(true)

    expect(findName(wrapper).text()).toBe('Jane Doe')

    expect(findCharacter(wrapper).text()).toBe('Supporting Character')
  })

  it('links to the correct URL', async () => {
    const personWithProfile = mockPerson()
    const wrapper = await initComponent({ item: personWithProfile })

    expect(findLink(wrapper).attributes('href')).toBe('/person/1')
  })
})
