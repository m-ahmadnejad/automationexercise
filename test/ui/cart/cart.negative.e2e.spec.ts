import {test} from '../../../fixtures/index'
import {multipleCartItems, singleCartItems} from '../../../data/checkout.data'
import { expectEmptyCartState } from '../../../utils/cartHelper'
import { addMultipleProducts } from '../../../utils/cartHelper'

test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 })
  await page.evaluate(()=>{
        localStorage.clear()
        sessionStorage.clear()
    })
})

test.describe('cart negative scenarios',()=>{
 test('should show empty cart state and hide checkout button after removing all items @cart @ui @regression ',async({page,productPage,viewCartPage,loggedInUser})=>{
    await test.step('ensure cart is empty',async({})=>{
        await viewCartPage.goToCart()
        await viewCartPage.removeAllItems()
         })
    await test.step('add multiple items to cart and remove all', async () => { 
        await page.goto('https://automationexercise.com/products')
        await addMultipleProducts(multipleCartItems,productPage)
        await viewCartPage.removeCartItems()
        })

    await test.step('verify empty cart state', async () => {
        await expectEmptyCartState(viewCartPage, page)
        })
})
test('should show empty cart state and hide checkout button after removing the only product @cart @regression @ui',async({page,productPage,viewCartPage,loggedInUser})=>{
    await test.step('ensure cart is empty',async({})=>{
         await viewCartPage.goToCart()
         await viewCartPage.removeAllItems()
   })
    await test.step('add one items to cart and remove all', async () => {
        await page.goto('https://automationexercise.com/products')
        await addMultipleProducts(singleCartItems,productPage)
        await viewCartPage.removeCartItems()
        })
    await test.step('verify empty cart state', async() => {
        await expectEmptyCartState(viewCartPage,page)
    })
})
})

