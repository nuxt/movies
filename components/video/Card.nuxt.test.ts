import type { Video } from '~/types'
import { mount } from '@vue/test-utils'

import { describe, expect, it, vi } from 'vitest'
import { mockVideo } from '~/tests/unit/mocks'
import Card from './Card.vue'

// Mock the useIframeModal function
const showModalMock = vi.fn()

vi.mock('~/composables/item', () => {
  return {
    useIframeModal: () => showModalMock,
    getVideoLink: (item: Video) => `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`,
  }
})

describe('card.vue', () => {
  it('renders video details correctly', () => {
    const wrapper = mount(Card, {
      props: {
        item: mockVideo(),
      },
    })

    expect(wrapper.find('[data-testid="video-name"]').text()).toBe(mockVideo().name)
    expect(wrapper.find('[data-testid="video-type"]').text()).toBe(mockVideo().type)
    expect(wrapper.find('[data-testid="video-image"]').attributes('src')).toContain(mockVideo().key)
  })

  it('calls play method when play button is clicked', async () => {
    const wrapper = mount(Card, {
      props: {
        item: mockVideo(),
      },
    })

    const playMock = vi.spyOn(wrapper.vm, 'play')
    await wrapper.find('[data-testid="play-button"]').trigger('click')

    expect(playMock).toHaveBeenCalled()
    expect(showModalMock).toHaveBeenCalledWith(`https://www.youtube.com/embed/${mockVideo().key}?rel=0&showinfo=0&autoplay=0`)
  })
})
