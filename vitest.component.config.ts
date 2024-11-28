import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['**/components/**/*.test.ts', '**/composables/**/*.test.ts'],
    name: 'component',
    environment: 'node',
  },
})
