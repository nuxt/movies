import { expect, test } from '@nuxt/test-utils/playwright'

test('homepage displays its movie and TV sections', async ({ page, goto }) => {
  await goto('', { waitUntil: 'hydration' })

  await expect(page.getByRole('heading', { level: 2, name: 'Popular Movies' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Popular TV Shows' })).toBeVisible()
})

test('homepage links to the movie catalogue', async ({ page, goto }) => {
  await goto('', { waitUntil: 'hydration' })

  await page.getByTitle('Movies').click()

  await expect(page).toHaveURL(/\/movie$/)
  await expect(page).toHaveTitle('Movies · Nuxt Movies')
  await expect(page.getByRole('heading', { level: 2, name: 'Top Rated Movies' })).toBeVisible()
})

test('switches the UI and TMDB content language without reloading', async ({ page, goto }) => {
  const hydrationWarnings: string[] = []
  page.on('console', (message) => {
    if (message.text().includes('Hydration') && message.text().includes('mismatch'))
      hydrationWarnings.push(message.text())
  })

  await goto('/tv/549', { waitUntil: 'hydration' })
  await page.locator('html').evaluate(element => element.setAttribute('data-language-switch-test', 'mounted'))

  await page.locator('#langSwitcher').selectOption('fr-FR')

  await expect(page.locator('#langSwitcher')).toHaveValue('fr-FR')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-FR')
  await expect(page.locator('html')).toHaveAttribute('data-language-switch-test', 'mounted')
  await expect(page.getByText('Synopsis', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('New York Police Judiciaire')
  expect(hydrationWarnings).toEqual([])
})
