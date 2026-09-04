import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StarsRate from './StarsRate.vue'

describe('starsRate', () => {
  it('renders stars correctly with default value', () => {
    const wrapper = mount(StarsRate)

    const starsFilled = wrapper.find('img[src="/stars-filled.webp"]')
    expect(starsFilled.exists()).toBe(true)
    expect(starsFilled.attributes('style')).toContain('clip-path: inset(0 100% 0 0);')
  })

  it('renders stars correctly with a given value', () => {
    const wrapper = mount(StarsRate, {
      props: {
        value: 5,
      },
    })

    const starsFilled = wrapper.find('img[src="/stars-filled.webp"]')
    expect(starsFilled.exists()).toBe(true)
    expect(starsFilled.attributes('style')).toContain('clip-path: inset(0 50% 0 0);')
  })

  it('renders stars correctly with a full value', () => {
    const wrapper = mount(StarsRate, {
      props: {
        value: 10,
      },
    })

    const starsFilled = wrapper.find('img[src="/stars-filled.webp"]')
    expect(starsFilled.exists()).toBe(true)
    expect(starsFilled.attributes('style')).toContain('clip-path: inset(0 0% 0 0);')
  })
})
