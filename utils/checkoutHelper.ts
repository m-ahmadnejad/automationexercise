import { expect } from "@playwright/test"
import { CheckoutItem } from "../data/checkout.data"
import { ProductItem } from "../data/checkout.data"
import { CheckoutPage } from "../pages/checkout"

export  function expectCheckoutItemsToMatch(uiItems:CheckoutItem[],expectedItems:ProductItem[]) {

           for(const expectedItem of expectedItems  ){
               const matched =  uiItems.find(p=>p.name===expectedItem.name)
               console.log('matched in checkout helper ********',matched)
               expect(matched, `Item not found in checkout: ${expectedItem.name}`).toBeTruthy()
               if(!matched) continue
               expect(matched.price).toBe(expectedItem.price)
               expect(matched.quantity).toBe(expectedItem.quantity)
               expect(matched.totalPrice).toBe(expectedItem.price*expectedItem.quantity)
            }
    
}

export async function verifyCheckoutReview(checkoutPage:CheckoutPage,expectedItems:ProductItem[]) {
    
         const uiItems = await checkoutPage.reviewOrder()
         console.log('uitems in checkout helper********',uiItems,'lenght',uiItems.length,'lenght expected',expectedItems.length)
         expect(uiItems.length).toBe(expectedItems.length)
         expectCheckoutItemsToMatch(uiItems,expectedItems)
}