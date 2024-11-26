import { expect, test } from '@nuxt/test-utils/playwright'

test('homepage displays correctly 1', async ({ page, goto }) => {
  await goto('', { waitUntil: 'hydration' })
  await expect(page.getByRole('heading')).toContainText('test1', { ignoreCase: true })
})

test('homepage displays correctly 2', async ({ page, goto }) => {
  await goto('', { waitUntil: 'hydration' })
  await expect(page.getByRole('heading')).toContainText('test2', { ignoreCase: true })
})
