import type { VueWrapper } from '@vue/test-utils'
import type { Person } from '~/types'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { describe, expect, it } from 'vitest'
import { baseUrl } from '~/tests/unit/config'
import { mockPerson } from '~/tests/unit/mocks'
import PersonCard from './Card.vue'

function initComponent(props: { item: Person }) {
  return mountSuspended(PersonCard, {
    props,
  })
}

describe('personCard', () => {
  // Helper functions to get elements by data-testid
  const findImage = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-image"]')
  const findName = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-name"]')
  const findCharacter = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-character"]')
  const findPlaceholder = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-placeholder"]')
  const findLink = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-link"]')

  it('renders correctly with profile image', async () => {
    const personWithProfile = mockPerson()

    const wrapper = await initComponent({ item: personWithProfile })

    expect(findImage(wrapper).exists()).toBe(true)

    expect(findImage(wrapper).attributes('src')).toBe(`${baseUrl}/ipx/f_webp&s_500x800/tmdb${personWithProfile.profile_path}`)
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

  it('renders correctly with known_for_department when character is missing', async () => {
    const personWithDepartment = mockPerson({ character: '', known_for_department: 'Acting', name: 'Jane Doe', id: 2 })
    const wrapper = await initComponent({ item: personWithDepartment })

    expect(findImage(wrapper).exists()).toBe(true)

    expect(findName(wrapper).text()).toBe('Jane Doe')

    expect(findCharacter(wrapper).text()).toBe('Acting')
  })

  it('links to the correct URL', async () => {
    const personWithProfile = mockPerson()
    const wrapper = await initComponent({ item: personWithProfile })

    expect(findLink(wrapper).attributes('href')).toBe('/person/1')
  })
})
