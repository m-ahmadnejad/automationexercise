import { Locator, Page, expect } from '@playwright/test'

export class ProductPage {
  constructor(private page: Page) {
    this.page = page
  }
async addToCart(productId: number) {
  await this.page
    .locator(`a.add-to-cart[data-product-id="${productId}"]`)
    .first()
    .click({ force: true })
}

  async continueShopping() {
    console.log('continueeeeeeeeeeeeee')
        await this.page.locator('.modal-content').getByRole('button',{name:'Continue Shopping'}).click()
  }

  async viewCart() {
    console.log('view cart ((((((')
    await this.page.getByText('View Cart').click()
  }

  getAddedMessage(): Locator {
    return this.page.getByText('Added!')
  }
}