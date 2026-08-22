import { test as base} from '@playwright/test'
import type { PageFixtures } from './page.fixture'
import type { ApiFixtures } from './api.fixtures'
import { multipleCartItems } from '../data/checkout.data'
import { addMultipleProducts } from '../utils/cartHelper'

export type FlowFixtures = {
   loggedInUser :void,
    goToPaymentAfterCheckout:() => Promise<void>,
}
export type FlowFixtureDefs = Parameters<typeof base.extend<FlowFixtures & PageFixtures &ApiFixtures>>[0]

export const flowTestFixtures: FlowFixtureDefs = {

     loggedInUser: async ({page, loginPage,createdUser}, use) => {
        await page.goto('/login')
        await loginPage.login(createdUser.user.email,createdUser.user.password)
        await page.waitForURL('/') 
        await use()
       },

    
    goToPaymentAfterCheckout:async({productPage,viewCartPage,checkoutPage},use)=>{
      await use(async()=>{
        await addMultipleProducts(multipleCartItems,productPage)
        await viewCartPage.clickProceedToCheckout()
        await checkoutPage.placeOrder()
      })
 },

      }

 
