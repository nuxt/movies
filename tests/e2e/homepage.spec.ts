import { expect, test } from '@nuxt/test-utils/playwright'

test('homepage displays correctly 1', async ({ page, goto }) => {
  await goto('', { waitUntil: 'hydration' })
  await expect(page.getByRole('heading')).toContainText('', { ignoreCase: true })
})

test('homepage displays correctly 2', async ({ page, goto }) => {
  await goto('', { waitUntil: 'hydration' })
  await expect(page.getByRole('heading')).toContainText('', { ignoreCase: true })
})

test('switches the UI and TMDB content language on the first reload', async ({ page, goto }) => {
  const hydrationWarnings: string[] = []
  page.on('console', (message) => {
    if (message.text().includes('Hydration') && message.text().includes('mismatch'))
      hydrationWarnings.push(message.text())
  })

  await goto('/tv/549', { waitUntil: 'hydration' })

  await page.locator('#langSwitcher').selectOption('fr-FR')
  await page.waitForLoadState('domcontentloaded')

  await expect(page.locator('#langSwitcher')).toHaveValue('fr-FR')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-FR')
  await expect(page.getByText('Synopsis', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('New York Police Judiciaire')
  expect(hydrationWarnings).toEqual([])
})
