import{Locator, Page} from '@playwright/test'
import { CheckoutItem} from '../data/checkout.data'
export class CheckoutPage{
    constructor(private page:Page){
    }
   addressDetail():Locator{
   return this.page.getByRole('heading',{name:'Address Details'})
    }
    //“This function works asynchronously and returns a Promise”  
    // Simple meaning:  it doesn’t return value immediately it returns it later
    //“When this function finishes, it will give me an array of CheckoutItem”
async reviewOrder(): Promise<CheckoutItem[]> {
  const result :CheckoutItem[]=[]
  const row= this.getRows()
  const count = await row.count()
  for(let i=0; i<count; i++){
    const wrapper = row.nth(i)
    //?.trim() mean::: if its not null trim space
    //??'' if its null or undefine returrns ''
    const productName =(await wrapper.locator('.cart_description h4 a').textContent())?.trim() ?? ''
    console.log('product name@@@@@@@@@@@',productName)
    const productRawPrice =(await wrapper.locator('.cart_price p').textContent())?.trim() ?? ''
    console.log('raw price <<<<',productRawPrice)
    const finalPrice = this.parseNumber(productRawPrice)
        console.log('product final price@@@@@@@@@@@@@',finalPrice)
    const productRawQuantity =(await wrapper.locator('.cart_quantity button').textContent())?.trim() ?? ''
  console.log('checkout raw quantity @@@@@@@@@@@22>>>', JSON.stringify(productRawQuantity))
  const productQuantity = this.parseNumber(productRawQuantity)
  //const productQuantity = Number(productRawQuantity.replace(/[^d]/g,''))
  const totalPrice =(await wrapper.locator('.cart_total_price').textContent())?.trim() ?? ''
      console.log('total price@@@@@@@@',totalPrice)
  const finalTotalPrice = this.parseNumber(totalPrice)
  const productId = await this.getProductId(wrapper)
      result.push({
        name: productName,
        price: finalPrice,
        quantity: productQuantity,
        totalPrice:finalTotalPrice,
        productId
      })
    }
return result
}
async placeOrder(){
    await this.page.getByText('Place Order').click()
}
 getRows():Locator{
  return  this.page.locator('tr[id^="product-"]')
}
//anything that is NOT a digit
//global (apply everywhere)
private parseNumber(value: string): number {
  return Number(value.replace(/[^\d]/g, ''))
}

async getProductId(row: Locator): Promise<number> {
    const id = await row.getAttribute('id')
    if (!id) throw new Error('Missing product id')

    const match = id.match(/\d+/)
    if (!match) throw new Error(`Invalid id format: ${id}`)

    return Number(match[0])
}

async handleVignetteAndRetryPlaceOrder(){
           if(this.page.url().includes('google_vignette')){
             await this.page.goBack()
             await this.placeOrder()
           }
}
}
