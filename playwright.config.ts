import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig<ConfigOptions>({
  testMatch: '**/tests/e2e/*.spec.ts',
  use: {
    baseURL: process.env.BASE_URL,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        channel: 'chrome',
        isMobile: false,
      },
      metadata: {
        deviceName: 'desktop-chrome',
      },
    },
    {
      name: 'Safari',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
        isMobile: false,
      },
      metadata: {
        deviceName: 'desktop-safari',
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Samsung Galaxy S20'],
        browserName: 'chromium',
        isMobile: true,
        viewport: { width: 412, height: 915 },
      },
      metadata: {
        deviceName: 'Samsung-Galaxy-20',
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 14'],
        isMobile: true,
        browserName: 'webkit',
        viewport: { width: 412, height: 915 },
      },
      metadata: {
        deviceName: 'Iphone-14',
      },
    },
  ],
})
