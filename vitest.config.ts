import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['**/components/**/*.vue', '**/composables/**/*.ts'],
    },
    projects: [
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['**/components/**/*.test.ts', '**/composables/**/*.test.ts'],
        },
      }),
      {
        test: {
          name: 'proxy',
          root: './proxy',
          include: ['tests/**/*.test.ts'],
          environment: 'node',
        },
      },
    ],
  },
})
