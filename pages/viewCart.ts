import { Locator, Page,expect } from '@playwright/test'
import { ProductItem } from '../data/checkout.data'
export class ViewCartPage {
  constructor(private page: Page) {}

  async getCartItems(): Promise<ProductItem[]> {
    const results: ProductItem[] = []
    const row = this.getRows()
    console.log('row******',row)
    const count:number = await row.count()
    console.log('count******',count)
   for(let index=0; index<count; index++){
      const wrapper = this.getRows().first()
      const productName = (await wrapper.locator('.cart_description h4 a').textContent())?.trim() || ''
       console.log('view cart product name',productName)
      const productRawPrice = (await wrapper.locator('.cart_price p').textContent())?.trim() || ''
      const productPrice = this.parseNumber(productRawPrice)
       console.log('view cart product price',productPrice)
      const productRawQuantity = (await wrapper.locator('.cart_quantity button').textContent())?.trim() || ''
        const productQuantity = this.parseNumber(productRawQuantity)
        console.log('view cart product quantity',productQuantity)
      results.push({
        name: productName,
        price: productPrice,
        quantity: productQuantity
      })
    }
        console.log('result ****',results)
    return results

  }
      async removeAllItems(){
        const deleteButton= this.page.locator('.cart_quantity_delete')
        while(await deleteButton.count()>0)
        {
             await deleteButton.first().click()
        }
    }
async removeCartItems(){
    const row = this.getRows()
    console.log('row******',row)
    const count:number = await row.count()
    console.log('count******',count)
   for(let index=0; index<count; index++){
        const beforeCount = await this.getRows().count()
      const wrapper = this.getRows().first()
        console.log('******wrapper in remove',wrapper)
        await wrapper.waitFor({state:'visible'})
        await wrapper.locator('a.cart_quantity_delete').click()
        
        //await expect(wrapper).not.toBeAttached()
        //inside page file dont use assertions
    await expect(this.getRows()).toHaveCount(beforeCount - 1)
     }

}
  getEmptyCart():Locator{

    return this.page.locator('#empty_cart p').getByText('Cart is empty!')
}
async clickContinueShoppingFromEmptyCart(){

    await this.page.locator('#empty_cart .text-center a').getByText('here').click()
}
//^=  means:  👉 starts with
getCartRow(product:string){
    return this.page.locator('tr[id^="product-"]').filter({hasText:product}).first()

}

 proceedToCheckoutButton():Locator{
   return  this.page.getByText('Proceed To Checkout')
}
async clickProceedToCheckout(){

  await (this.proceedToCheckoutButton().waitFor({ state: 'visible' }))
   await  this.proceedToCheckoutButton().click()
}
async goToCart(){
       await this.page.locator('.navbar-nav').locator('a .fa-shopping-cart').click()
    }

  private parseNumber(value:string){
    return Number(value.replace(/[^\d]/g, ''))
  }
   getRows():Locator{
  return  this.page.locator('tr[id^="product-"]')
}

}
