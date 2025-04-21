import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['**/tests/unit/**/*.test.ts', '**/components/**/*.test.ts', '**/composables/**/*.test.ts'],
    name: 'unit',
    environment: 'node',
    coverage: {
      include: ['**/components/**/*.vue', '**/composables/**/*.ts'],
    },
  },
})
