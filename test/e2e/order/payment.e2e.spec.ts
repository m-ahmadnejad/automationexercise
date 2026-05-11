import { test, expect } from '../../../fixtures/index'
import { addToCartAndProceedToCheckout } from '../../../utils/workflowHelper'
import { cartworkflow } from '../../../data/workflow.data'
import { submitPayment } from '../../../utils/paymentHelper'
import { validPaymentDetails } from '../../../data/payment.data'
import { verifyCheckoutReview } from '../../../utils/checkoutHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})

    for(const c of cartworkflow)
    {
      const tag = c.name === 'single product' ? '@smoke' : ''
      test(`should complete payment successfully with correct checkout details for ${c.name}  @payment @smoke  @e2e @regression ${tag}`, async ({loggedInUser,page,productPage,viewCartPage,checkoutPage,paymentDonePage,paymentPage}) => {
          await test.step(` add ${c.name}, and proceed to checkout, ${c.data}`, async () => {
                  await addToCartAndProceedToCheckout(productPage, viewCartPage, c.data,page)
                                     })
          await test.step(`verify checkout review ${c.name} and navigate to payment page`, async () => {
                  await verifyCheckoutReview(checkoutPage,c.data)
          })
          await test.step('place order and navigate to payment page', async () => {
                  await checkoutPage.placeOrder()
                  await checkoutPage.handleVignetteAndRetryPlaceOrder()
                await  page.waitForURL(/\/payment/, { timeout: 15000 }),
                  await expect(page).toHaveURL(/payment/)
                  await expect(paymentPage.payButton).toBeVisible()
  })
          await test.step('fill payment details and confirm payment', async () => {
                  await submitPayment(paymentPage,validPaymentDetails)
  })
          await test.step('verify order is placed successfully ', async () => {
                  await expect(page).toHaveURL(/payment_done\/\d+/)
                  await expect(paymentDonePage.getConfirmationMessage()).toBeVisible()
                  await expect(paymentDonePage.getOrderPlacedMessage()).toBeVisible()
  })
})
}