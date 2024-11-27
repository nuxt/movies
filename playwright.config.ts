import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import process from 'node:process'
import { defineConfig } from '@playwright/test'

export default defineConfig<ConfigOptions>({
  testMatch: '**/tests/e2e/*.spec.ts',
  use: {
    baseURL: process.env.BASE_URL,
  },
})
