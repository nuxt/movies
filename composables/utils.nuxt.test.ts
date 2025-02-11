import { describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import LANGUAGES from '~/constants/languages'
import { formatDate, formatLang, formatTime, formatVote, numberWithCommas, useSingleton } from './utils'

describe('utils', () => {
  describe('formatDate', () => {
    it('should format date according to locale', () => {
      const date = '2023-10-01'
      const formattedDate = formatDate(date)
      expect(formattedDate).toBe(new Date(date).toLocaleDateString('en-US'))
    })
  })

  describe('formatTime', () => {
    it('should format minutes into hours and minutes', () => {
      expect(formatTime(125)).toBe('2h 5min')
      expect(formatTime(45)).toBe('45min')
      expect(formatTime(0)).toBe('0min')
    })
  })

  describe('numberWithCommas', () => {
    it('should format number with commas', () => {
      expect(numberWithCommas(1000)).toBe('1,000')
      expect(numberWithCommas(1234567)).toBe('1,234,567')
    })
  })

  describe('formatLang', () => {
    it('should return the full English name of the language if found', () => {
      const iso = 'en'
      const language = LANGUAGES.find(lang => lang.iso_639_1 === iso)
      if (language) {
        expect(formatLang(iso)).toBe(language.english_name)
      }
    })

    it('should return "No Language" if the language is xx', () => {
      const iso = 'xx'
      expect(formatLang(iso)).toBe('No Language')
    })

    it('should handle if the language is not found', () => {
      const iso = 'John Doe'
      expect(formatLang(iso)).toBe('John Doe')
    })
  })

  describe('useSingleton', () => {
    it('should provide and use singleton without issues', () => {
      const [provideFn, useFn] = useSingleton<() => void>()

      const mockFn = vi.fn()

      const ProviderComponent = defineComponent({
        setup() {
          provideFn(mockFn)
          return () => h('div', 'ProviderComponent')
        },
      })

      const ConsumerComponent = defineComponent({
        setup() {
          const usedFn = useFn()
          expect(usedFn).toBe(mockFn)
          return () => h('div', 'ConsumerComponent')
        },
      })

      const app = createApp({
        components: { ProviderComponent, ConsumerComponent },
        template: '<ProviderComponent /><ConsumerComponent />',
      })

      const root = document.createElement('div')
      app.mount(root)
    })

    it('should use fallback value if singleton is not provided', () => {
      const [, useFn] = useSingleton<string>()

      const fallback = 'fallback value'

      const ConsumerComponent = defineComponent({
        setup() {
          const usedValue = useFn(fallback)
          expect(usedValue).toBe(fallback)
          return () => h('div', 'ConsumerComponent')
        },
      })

      const app = createApp({
        components: { ConsumerComponent },
        template: '<ConsumerComponent />',
      })

      const root = document.createElement('div')
      app.mount(root)
    })
  })

  describe('formatVote', () => {
    it('should format vote count correctly', () => {
      expect(formatVote(1234)).toBe('1.2K')
      expect(formatVote(56789)).toBe('56.8K')
      expect(formatVote(7.3)).toBe('7.3')
      expect(formatVote(0)).toBe('0')
      expect(formatVote(undefined)).toBe('0')
    })
  })
})
