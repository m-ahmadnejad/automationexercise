import {test,expect} from '../../../fixtures/index'
import { submitLogin } from '../../../utils/authHelper/authHelper'
import { validPaymentDetails } from '../../../data/payment.data'
import { cartworkflow } from '../../../data/workflow.data'
import { addMultipleProducts } from '../../../utils/cartHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test.beforeEach(async({page,loginPage,createdUser})=>{
            await  submitLogin(page,loginPage,createdUser.user)
            await expect(page.getByText(/Logged in as/i)).toBeVisible()
})
for(const c of cartworkflow){
  const tag = c.name === 'single user' ? '@smoke' : ''
  test(`should successfully place an order for  ${c.name} ${tag}  @regression @e2e  @order `,async({page,productPage,viewCartPage,checkoutPage,paymentDonePage,paymentPage})=>{
   await test.step(`add products to cart using ${c.name} `,async()=>{
      await addMultipleProducts(c.data,productPage)
      const cartItems = await viewCartPage.getCartItems()
      await expect(cartItems).toHaveLength(c.data.length)
      })
    await test.step('proceed to checkout and navigate to payment',async()=>{
      await viewCartPage.clickProceedToCheckout()
      await checkoutPage.placeOrder()
      await expect(page).toHaveURL(/payment/)
      await expect(paymentPage.payButton).toBeVisible()
     })
    await test.step('fill payment details and confirm payment',async()=>{
      await paymentPage.fillPaymentDetails(validPaymentDetails)
      await paymentPage.clickPayAndConfirm()
     })
    await test.step('should show successful order confirmation', async()=>{
      await expect(page).toHaveURL(/payment_done\/\d+/)
      await expect(paymentDonePage.getConfirmationMessage()).toBeVisible()
      await expect(paymentDonePage.getOrderPlacedMessage()).toBeVisible()
    })

     })
   }