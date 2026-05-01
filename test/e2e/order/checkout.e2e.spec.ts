import { test, expect } from '../../../fixtures/index'
import {  expectCheckoutItemsToMatch } from '../../../utils/checkoutHelper'
import { multipleCartItems,singleCartItems } from '../../../data/checkout.data'
import { addToCartAndProceedToCheckout } from '../../../utils/workflowHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test.describe('checkout', () => {
  test('should display correct order details on checkout page for multiple products', async ({page,loggedInUser,productPage,viewCartPage,checkoutPage}) => {
    await test.step('add multiple items to cart and proceed to checkout', async () => {
      await addToCartAndProceedToCheckout(productPage, viewCartPage, multipleCartItems)
    })

    await test.step('verify items in checkout', async () => {
      await expect(page).toHaveURL(/checkout/)
      await expect(checkoutPage.addressDetail()).toBeVisible()
      const uiItems = await checkoutPage.reviewOrder()
      expect(uiItems).toHaveLength(multipleCartItems.length)
      await expectCheckoutItemsToMatch(uiItems,multipleCartItems)
    })
  })
  test('should display correct order details on checkout page for signle product', async ({page,loggedInUser,productPage,viewCartPage,checkoutPage}) => {
    await test.step('add single item to cart and proceed to checkout', async () => {
      await addToCartAndProceedToCheckout(productPage, viewCartPage, singleCartItems)
    })

    await test.step('verify item in checkout', async () => {
      await expect(page).toHaveURL(/checkout/)
      await expect(checkoutPage.addressDetail()).toBeVisible()
      const uiItems = await checkoutPage.reviewOrder()
      expect(uiItems).toHaveLength(singleCartItems.length)
      await expectCheckoutItemsToMatch(uiItems,singleCartItems)
    })
  })
})