import { ProductPage } from "../pages/productPage"
import { ProductItem, ProductItemResult } from "../data/checkout.data"
import { ViewCartPage } from "../pages/viewCart"
import { expect,Page } from "@playwright/test"

 export async function addMultipleProducts(items:ProductItem[],productPage:ProductPage){
        for(const [index,item] of items.entries()){
            await productPage.addToCart(item.productId)
            if(index<items.length -1){
                 await productPage.continueShopping()
        }
     }
        await productPage.viewCart()
    }

export async function verifyItemsInCart(viewCartPage:ViewCartPage,expectedItem:ProductItemResult[]) {
        const uiItems = await viewCartPage.getCartItems()
        expect(uiItems).toHaveLength(expectedItem.length)
        await expectCartItemsToMatch(uiItems,expectedItem)
}

export function expectCartItemsToMatch(uiItems: ProductItemResult[],expectedItems: ProductItemResult[]) {
  for (const expectedItem of expectedItems) {
    const matched = uiItems.find(p => p.name === expectedItem.name)

    expect(matched,`Item not found in cart: ${expectedItem.name}`).toBeTruthy()

    if (!matched) continue

    expect(matched.price).toBe(expectedItem.price)
    expect(matched.quantity).toBe(expectedItem.quantity)
  }
}

export async function expectEmptyCartState(viewCartPage:ViewCartPage,page:Page){
                await expect(viewCartPage.getRows()).toHaveCount(0)
  await expect(viewCartPage.proceedToCheckoutButton()).not.toBeVisible()
}
