/*import { test, expect} from '../../../fixtures/index'
import { addToCart,verifyItemsInCart}from '../../../utils/cartHelper'
import { addToCartAndPlaceOrder, addToCartAndProceedToCheckout } from '../../../utils/checkoutHelper'

test.use({storageState: 'playwright/.auth/user.json'})
test.beforeEach(async ({ page }) => {
  await page.goto('https://automationexercise.com/')
  await expect(page.getByText('Logged in as')).toBeVisible()
})
test.skip('add item to cart', async({page,productPage})=>{
  await productPage.addToCart('Blue Top')
  await expect(page.locator('.modal-content')).toBeVisible()
  await expect(page.getByText('Added!')).toBeVisible()
  })
test.skip('view cart', async({page,productPage,viewCartPage})=>{
  await addToCart(productPage,'Blue Top')
  const item = await viewCartPage.getCartItems('Blue Top')
  console.log('item name ******* :',item.name,'item price *******:',item.price)
  await expect(item.name).toBe('Blue Top')
  await expect(item.price).toBe(500)
})
test.skip('verify remove item from view cart',async({page,productPage,viewCartPage})=>{
  await addToCart(productPage,'Blue Top')
  const item = await viewCartPage.viewCart('Blue Top')
  console.log('item name ******* :',item.name,'item price *******:',item.price)
  await viewCartPage.removeItemViewCart('Blue Top')
  await expect(viewCartPage.emptyCart()).toBeVisible()
  await expect(viewCartPage.cartRow('Blue Top')).not.toBeVisible()
})
test.skip('checkout page review order ',async({page,productPage,viewCartPage,checkoutPage})=>{
  await addToCartAndProceedToCheckout(productPage,'Blue Top',viewCartPage)
  await expect(page).toHaveURL(/checkout/)
  await expect(checkoutPage.addressDetail()).toBeVisible()
  const item = await checkoutPage.reviewOrder('Blue Top')
  console.log('item name ******* :',item.name,'item price *******:',item.price,'item quantity ********',item.quantity,'total price *****',item.totalPrice)
   expect(item.name).toBe('Blue Top')
   expect(item.price).toBe(500)
   expect(item.quantity).toBe(1)
  const totalPriceCheckout = (item.price)*(item.quantity)
  console.log('totalPriceChekcout "****',totalPriceCheckout)
  expect(item.totalPrice).toBe(totalPriceCheckout)
  })
test.skip('ubmitting payment redirects to payment done page', async({page,productPage,viewCartPage,checkoutPage,paymentPage})=>{
  await addToCartAndPlaceOrder(productPage,'Blue Top',viewCartPage,checkoutPage)
  await expect(page).toHaveURL(/payment/)
  await expect(paymentPage.payment()).toBeVisible()
  await paymentPage.fillPaymentDetail('Mojgan','1234444','234','12','23')
  await paymentPage.payAndConfirmButtonClick()
   await expect(page).toHaveURL(/payment_done\/\d+/)
})
test.skip('payment done page shows success confirmation', async({page,productPage,checkoutPage,viewCartPage,paymentDonePage,paymentPage})=>{
  await addToCartAndPlaceOrder(productPage,'Blue Top',viewCartPage,checkoutPage)
  await expect(page).toHaveURL(/pay/)
  await expect(paymentPage.payment()).toBeVisible()
  await paymentPage.fillPaymentDetail('Mojgan','1234444','234','12','23')
  await paymentPage.payAndConfirmButtonClick()
  await expect(page).toHaveURL(/payment_done\/\d+/)
  await expect(paymentDonePage.confirmationMessage()).toBeVisible()
  await expect(paymentDonePage.orderPlacedMessage()).toBeVisible()
})

*/