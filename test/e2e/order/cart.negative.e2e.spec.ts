import {test} from '../../../fixtures/index'
import {multipleCartItems, singleCartItems} from '../../../data/checkout.data'
import { expectEmptyCartState } from '../../../utils/cartHelper'
import { addMultipleProducts } from '../../../utils/cartHelper'
/*test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})*/
test.describe('cart negative scenarios',()=>{

    test('should show empty cart state and hide checkout button after removing all items',async({page,productPage,viewCartPage,loggedInUser})=>{
            test.step('add multiple cart items and remove all',async({})=>{
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
      test.step('add single cart item and remove it',async({})=>{
            await addMultipleProducts(singleCartItems,productPage,page)
            await viewCartPage.removeCartItems()
      })
        await test.step('verify empty cart state', async() => {    
            await expectEmptyCartState(viewCartPage,page)

    })
})
})
