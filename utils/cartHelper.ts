import { ProductPage } from "../pages/productPage"
import { ProductItem, ProductItemResult } from "../data/checkout.data"
import { ViewCartPage } from "../pages/viewCart"
import { expect,Page } from "@playwright/test"

 export async function addMultipleProducts(items:ProductItem[],productPage:ProductPage,page:Page){
        console.log('itemsssssssssssssssss',items)
        for(const [index,item] of items.entries()){
            console.log('items.entites 888888&&&&&&&&&&&&&&&&&&',items.entries())
            console.log('items and index******',index,item)
            await productPage.addToCart(item.productId)
            console.log('item.name^^^^',item.name,item.productId)
            if(index<items.length -1){
                console.log('conitinue shopping ###########')
                 await productPage.continueShopping()
        }
     }
        await productPage.viewCart()
    }
//one is extra

export async function verifyItemsInCart(viewCartPage:ViewCartPage,expectedItem:ProductItemResult[]) {
        const uiItems = await viewCartPage.getCartItems()
        console.log('uitemsOOOOOO',uiItems)
        expect(uiItems).toHaveLength(expectedItem.length)
        await expectCartItemsToMatch(uiItems,expectedItem)

        
}
//the secnd one is better than the
export function expectCartItemsToMatch(uiItems: ProductItemResult[],expectedItems: ProductItemResult[]) {
  for (const expectedItem of expectedItems) {
    const matched = uiItems.find(p => p.name === expectedItem.name)
    console.log('uiitemsssss',uiItems)
    console.log('matcheddddd', matched)
    console.log('expected itemsssss',expectedItem)

    // اگر آیتم پیدا نشد fail کن
    expect(matched,`Item not found in cart: ${expectedItem.name}`).toBeTruthy()

    if (!matched) continue

    expect(matched.price).toBe(expectedItem.price)
    expect(matched.quantity).toBe(expectedItem.quantity)
  }
}

export async function expectEmptyCartState(viewCartPage:ViewCartPage,page:Page){
                console.log('expectEmtyCArt state funciton (((((())))))))')
                console.log('url in expect empty caet state function',await page.url())
                await expect(viewCartPage.getRows()).toHaveCount(0)
  await expect(viewCartPage.proceedToCheckoutButton()).not.toBeVisible()
}