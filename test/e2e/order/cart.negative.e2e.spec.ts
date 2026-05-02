import {test} from '../../../fixtures/index'
import {multipleCartItems, singleCartItems} from '../../../data/checkout.data'
import { expectEmptyCartState } from '../../../utils/cartHelper'
import { addMultipleProducts } from '../../../utils/cartHelper'

test.skip('flaky test',async({})=>{
  test.beforeEach(async({page})=>{
await page.context().clearCookies()
await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 })

    await page.evaluate(()=>{
        localStorage.clear()
        sessionStorage.clear()
    })
})

test.describe('cart negative scenarios',()=>{

    test('should show empty cart state and hide checkout button after removing all items',async({page,productPage,viewCartPage,loggedInUser})=>{
            console.log('START TEST URL:', page.url())
       
    await test.step('ensure cart is empty',async({})=>{
        console.log('ensure cart is empty')
         await viewCartPage.goToCart()
         await viewCartPage.removeAllItems()

    })
    await test.step('add multiple items to cart and remove all', async () => { 
        console.log('add multiple items to cart')
        await page.goto('https://automationexercise.com/products')
        await addMultipleProducts(multipleCartItems,productPage,page)
        console.log('****************')
              await viewCartPage.removeCartItems()
              console.log('url after remove*************',page.url())
            })

          await test.step('verify empty cart state', async () => {
             console.log('ENTER VERIFY EMPTY CART STEP')
             console.log('current url:', page.url())

             await expectEmptyCartState(viewCartPage, page)
})
})
    test('should show empty cart state and hide checkout button after removing the only product',async({page,productPage,viewCartPage,loggedInUser})=>{
    await test.step('ensure cart is empty',async({})=>{
        console.log('ensure cart is empty')
         await viewCartPage.goToCart()
         await viewCartPage.removeAllItems()

    })
    await test.step('add multiple items to cart and remove all', async () => { 
        console.log('add multiple items to cart')
        await page.goto('https://automationexercise.com/products')
        await addMultipleProducts(singleCartItems,productPage,page)
        console.log('****************')
              await viewCartPage.removeCartItems()
              console.log('url after remove*************',page.url())
            })
        await test.step('verify empty cart state', async() => {    
            await expectEmptyCartState(viewCartPage,page)

    })
})
})

})
