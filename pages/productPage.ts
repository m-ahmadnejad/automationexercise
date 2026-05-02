import { Locator, Page, expect } from '@playwright/test'

export class ProductPage {
  constructor(private page: Page) {
    this.page = page
  }
async addToCart(productId: number) {
  const productCard = this.page.locator('.product-image-wrapper').filter({has: this.page.locator(`a.add-to-cart[data-product-id="${productId}"]`),}).first()

  const btn = productCard.locator(`.productinfo a.add-to-cart[data-product-id="${productId}"]`)

  await btn.scrollIntoViewIfNeeded()
  await btn.click()
  const modalWrapper = this.page.locator('#cartModal').first()

  await expect(modalWrapper).toBeVisible()
}

  async continueShopping() {
    console.log('continueeeeeeeeeeeeee')
        await this.page.locator('.modal-content').getByRole('button',{name:'Continue Shopping'}).click()
  }

  async viewCart() {
    console.log('view cart ((((((')
    await this.page.getByText('View Cart').click()
    console.log('url after view cart click',this.page.url())
  }

  getAddedMessage(): Locator {
    return this.page.getByText('Added!')
  }
}