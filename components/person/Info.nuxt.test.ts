import type { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import { mockPerson } from '~/tests/unit/mocks'
import PersonInfo from './Info.vue'

describe('personInfo', () => {
  // Helper functions to get elements by data-testid
  const getContainer = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-details-container"]')
  const getProfileImage = (wrapper: VueWrapper) => wrapper.find('[data-testid="profile-image"]')
  const getName = (wrapper: VueWrapper) => wrapper.find('[data-testid="person-name"]')
  const getBiography = (wrapper: VueWrapper) => wrapper.find('[data-testid="biography"]')
  const getNoBiography = (wrapper: VueWrapper) => wrapper.find('[data-testid="no-biography"]')
  const getKnownForLabel = (wrapper: VueWrapper) => wrapper.find('[data-testid="known-for-label"]')
  const getKnownFor = (wrapper: VueWrapper) => wrapper.find('[data-testid="known-for"]')
  const getPlaceOfBirthLabel = (wrapper: VueWrapper) => wrapper.find('[data-testid="place-of-birth-label"]')
  const getPlaceOfBirth = (wrapper: VueWrapper) => wrapper.find('[data-testid="place-of-birth"]')
  const getBirthdayLabel = (wrapper: VueWrapper) => wrapper.find('[data-testid="birthday-label"]')
  const getBirthday = (wrapper: VueWrapper) => wrapper.find('[data-testid="birthday"]')
  const getExternalLinks = (wrapper: VueWrapper) => wrapper.find('[data-testid="external-links"]')

  it('renders the container', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonInfo, {
      props: { item },
    })

    expect(getContainer(wrapper).exists()).toBe(true)
  })

  it('renders the profile image', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonInfo, {
      props: { item },
    })

    expect(getProfileImage(wrapper).exists()).toBe(true)
  })

  it('renders the name and biography', async () => {
    const item = mockPerson({ biography: 'This is a biography.' })

    const wrapper = await mountSuspended(PersonInfo, {
      props: { item },
    })

    expect(getName(wrapper).text()).toBe(item.name)
    expect(getBiography(wrapper).text()).toBe(item.biography)
  })

  it('renders the known for, place of birth, and birthday', async () => {
    const item = mockPerson({
      known_for_department: 'Acting',
      place_of_birth: 'Somewhere',
      birthday: '1980-01-01',
    })

    const wrapper = await mountSuspended(PersonInfo, {
      props: { item },
    })

    expect(getKnownForLabel(wrapper).text()).toBe('Known for')
    expect(getKnownFor(wrapper).text()).toBe(item.known_for_department)
    expect(getPlaceOfBirthLabel(wrapper).text()).toBe('Place of birth')
    expect(getPlaceOfBirth(wrapper).text()).toBe(item.place_of_birth)
    expect(getBirthdayLabel(wrapper).text()).toBe('Birthday')
    expect(getBirthday(wrapper).text()).toBe('1/1/1980')
  })

  it('renders external links', async () => {
    const item = mockPerson()

    const wrapper = await mountSuspended(PersonInfo, {
      props: { item },
    })

    expect(getExternalLinks(wrapper).exists()).toBe(true)
  })

  it('renders no biography text when biography is missing', async () => {
    const item = mockPerson({ biography: '' })

    const wrapper = await mountSuspended(PersonInfo, {
      props: { item },
    })

    expect(getNoBiography(wrapper).text()).toBe('(no biography)')
  })
})
