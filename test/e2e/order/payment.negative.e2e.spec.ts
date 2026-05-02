import { test, expect } from '../../../fixtures/index'
import { multipleCartItems } from '../../../data/checkout.data'
import {validPaymentDetails,invalidPayment,PaymentDetail} from '../../../data/payment.data'
import { addToCartAndPlaceOrder, completeWorkFlow } from '../../../utils/workflowHelper'
import { PaymentPage } from '../../../pages/payment'
import type { Locator } from '@playwright/test'
import {  expectPaymentDetailsToBeCleared,expectPaymentFieldsToBeFilled, submitPayment} from '../../../utils/paymentHelper'
import { expectNativeFieldValidation } from '../../../utils/commonHelper'
import { addMultipleProducts } from '../../../utils/cartHelper'
// in this test we have 2 + 1 + 1 failure >>4
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})

test.describe('payment access control',()=>{
        test.fixme('logged in user cannot access payment page directly before checkout',async({page,loggedInUser,loginPage,productPage})=>{
            await test.step('login with existing user ',async()=>{

                 await addMultipleProducts(multipleCartItems,productPage,page)
                 await page.goto('/payment')
                 console.log('url in first test******',page.url())
                 await expect(page).toHaveURL(/checkout|cart/)
        })
    })
        test.fixme('should NOT allow direct access to payment page after logout ',async({page,loggedInUser,loginPage,productPage,viewCartPage,checkoutPage,logOutPage})=>{

            await addToCartAndPlaceOrder(productPage,viewCartPage,checkoutPage,multipleCartItems)
            await logOutPage.logOut()
            console.log(' First URL : URL&*&*&*&*',page.url())
            await expect(page).toHaveURL(/login/)
            await page.goto('/payment')
            console.log('URL&*&*&*&*',page.url())
            await expect(page).not.toHaveURL('/payment')
            await expect(page).toHaveURL(/login/)
})
})
test.describe('payment required field validation',()=>{
    type paymentTestCases ={name:string,data:{payment:PaymentDetail,expectedMessage:string},field:(p:PaymentPage)=>Locator} 
        const cases:paymentTestCases[] =[
                {name:'Name on Card', data:{payment:invalidPayment.emptyNameOnCard,expectedMessage:'Please fill'}, field: (p) => p.nameOnCardInput},
                {name:'Card number', data:{payment:invalidPayment.emptyCardNumber,expectedMessage:'Please fill'}, field: (p) => p.cardNumberInput},
                {name:'CVC', data:{payment:invalidPayment.emptyCVC,expectedMessage:'Please fill'}, field: (p) => p.cvcInput},
                {name:'Exp Monts', data:{payment:invalidPayment.emptyExpMonth,expectedMessage:'Please fill'}, field: (p) => p.expMonthInput},
                {name:'Exp Year', data:{payment:invalidPayment.emptyExpYear,expectedMessage:'Please fill'}, field: (p) => p.expYearInput}
                                            ]
                 for(const c of cases){
                     test(`should not allow payment when ${c.name} is empty`, async({page,paymentPage,productPage,viewCartPage,checkoutPage,loggedInUser})=>{
                          await addToCartAndPlaceOrder(productPage,viewCartPage,checkoutPage,multipleCartItems)
                          await submitPayment(paymentPage,c.data.payment)
                          await expectNativeFieldValidation(c.field(paymentPage),c.data.expectedMessage)
                          await expect(page).toHaveURL(/payment/)
                                      })
                                      }
})
  test.describe('payment submission behavior',()=>{
        test('should not create duplicate payment submission after repeated pay attempt',async({page,paymentPage,paymentDonePage,loggedInUser,goToPaymentAfterCheckout})=>{
            let orderRequest =0
            page.on('request',request=>{if (request.url().includes('/payment') && (request.method()==='POST')){
                        orderRequest++
                  }
                })
            await goToPaymentAfterCheckout()

                                
            await expect(page).toHaveURL(/payment/)
            await paymentPage.fillPaymentDetails(validPaymentDetails)
            await Promise.all([
                  paymentPage.clickPayAndConfirm(),
                  paymentPage.clickPayAndConfirm(),
                              ])
            await expect(page).toHaveURL(/payment_done/)
            expect(orderRequest).toBe(1)
            await  expect(paymentDonePage.getConfirmationMessage()).toBeVisible()
            await expect(paymentDonePage.getConfirmationMessage()).toBeVisible()      
               
})
        
        test('order confirmation remains visible after refreshing payment done page',async({page,productPage,viewCartPage,checkoutPage,paymentPage,paymentDonePage,loggedInUser})=>{
            await addToCartAndPlaceOrder(productPage,viewCartPage,checkoutPage,multipleCartItems)
            await completeWorkFlow(paymentPage,validPaymentDetails)
            await page.reload()
            await expect(page).toHaveURL(/payment_done\/\d+/)
            await expect(paymentDonePage.getConfirmationMessage()).toBeVisible()
})
        })
    
 test.describe('payment persistence and navigation behavior',()=>{
        test.fixme('should not allow access to payment page through browser back after logout',async({page,logOutPage,productPage,viewCartPage,checkoutPage,loggedInUser})=>{
            await addToCartAndPlaceOrder(productPage,viewCartPage,checkoutPage,multipleCartItems)
            await expect(page).toHaveURL(/payment/)
            await logOutPage.logOut()
            console.log(' First URL : URL&*&*&*&*',page.url())
            await expect(page).toHaveURL(/login/)
            await page.goBack()
            console.log('URL&*&*&*&*',page.url())
            await expect(page).not.toHaveURL(/payment/)
            await expect(page).toHaveURL(/login/)
})
        test.fixme('should clear payment details after navigating back from confirmation page',async({page,paymentPage,paymentDonePage,productPage,viewCartPage,checkoutPage,loggedInUser})=>{
            await addToCartAndPlaceOrder(productPage,viewCartPage,checkoutPage,multipleCartItems)
            await paymentPage.fillPaymentDetails(validPaymentDetails)
            console.log('valid payment deatail',validPaymentDetails)
            await expectPaymentFieldsToBeFilled(paymentPage)
            await paymentPage.clickPayAndConfirm()
            await expect(paymentDonePage.getOrderPlacedMessage()).toBeVisible()
            await expect(page).toHaveURL(/payment_done/)
            await page.goBack()
            await expect(page).toHaveURL(/payment/)
            await expectPaymentDetailsToBeCleared(paymentPage)
})    
    test('should clear payment details after refreshing payment page',async({page,paymentPage,productPage,viewCartPage,checkoutPage,loggedInUser})=>{
            await addToCartAndPlaceOrder(productPage,viewCartPage,checkoutPage,multipleCartItems)
            await paymentPage.fillPaymentDetails(validPaymentDetails)
            await page.reload()
            await expect(page).toHaveURL(/payment/)
            await expectPaymentDetailsToBeCleared(paymentPage)
  })
  })








