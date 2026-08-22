import { test, expect} from '../../../fixtures/index'
import { validPaymentDetails } from '../../../data/payment.data'
import { completeWorkFlow } from '../../../utils/workflowHelper'
import { generateEmail } from "../../../utils/commonHelper"
import { performSignupAndCheckNavigation } from "../../../utils/signupHelper"
import { signUpFirstStepUsers, validSignUpSecondStepData } from '../../../data/signUp.data'
import { multipleCartItems } from '../../../data/checkout.data'
import { expectCheckoutItemsToMatch } from '../../../utils/checkoutHelper'
import { addMultipleProducts, expectCartItemsToMatch } from '../../../utils/cartHelper'

//test.use({storageState: 'playwright/.auth/user.json'})
test.beforeEach(async ({page})=>{
              await page.goto('/signup')
              })
test.describe('testing workflow using ui',()=>{
  test('should allow a newly signed-up user to complete the full purchase flow via UI @e2e @order @ui @regression',async({loginPage,signUpPage,signUpSecondPage,productPage,viewCartPage,checkoutPage,page,paymentPage,paymentDonePage})=>{
    
    const email =  generateEmail('mojgan')
    await test.step('sign up using unregieserd and valid email and password',async()=>{
             await performSignupAndCheckNavigation(page,signUpPage,signUpFirstStepUsers.validUser.name,email,signUpSecondPage)
             await signUpSecondPage.completeSignup(validSignUpSecondStepData)
             await signUpSecondPage.clickContinue()
             console.log('url11111111111',page.url())
    })
    await test.step('login using regiester email ',async({})=>{
      await page.goto('/signup')
      await loginPage.login(email,validSignUpSecondStepData.password)
      await expect(page.getByText('Logged in as ')).toBeVisible()
})
  await test.step(`add ${multipleCartItems.length} items to cart`, async({})=>{
    await addMultipleProducts(multipleCartItems,productPage)
  })
    await test.step('view cart', async({})=>{
         const uiItem = await viewCartPage.getCartItems()
                console.log('cart ui items',uiItem)
         expect(uiItem).toHaveLength(multipleCartItems.length)

      await expectCartItemsToMatch(uiItem,multipleCartItems)
    
  })
   await test.step('checkout page review order ',async({})=>{
       await viewCartPage.clickProceedToCheckout()
       await expect(page).toHaveURL(/checkout/)
       await expect(checkoutPage.addressDetail()).toBeVisible()
       const uiItem = await checkoutPage.reviewOrder()   
       console.log('checkout ui items',uiItem)
       await expectCheckoutItemsToMatch(uiItem,multipleCartItems)
      })
   await test.step('submitting payment redirects to payment done page', async({})=>{
        await checkoutPage.placeOrder()
        await expect(page).toHaveURL(/payment/)
        await expect(paymentPage.payButton).toBeVisible()
})
   await test.step('payment done page shows success confirmation', async({})=>{
         await completeWorkFlow(paymentPage,validPaymentDetails)
         await expect(page).toHaveURL(/payment_done\/\d+/)
         await expect(paymentDonePage.getConfirmationMessage()).toBeVisible()
         await expect(paymentDonePage.getConfirmationMessage()).toBeVisible()
})    
    })
  })

