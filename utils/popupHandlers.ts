import { Page } from "@playwright/test"
export async function handleGoogleVignetteAd(page: Page): Promise<void> {
  try {
    await page.waitForURL('**#google_vignette', { timeout: 1000 })
    await page.goBack()
    await page.waitForLoadState('load')
  } catch {
    // no ad appeared
  }
}
export async function blockAds(page: Page) {
  await page.route('**/*', async route => {
    const url = route.request().url()

    if (
      url.includes('googlesyndication') ||
      url.includes('doubleclick') ||
      url.includes('googleads') ||
      url.includes('adservice.google')
    ) {
      await route.abort()
      return
    }

    await route.continue()
  })
}