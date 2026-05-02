import {test, expect} from '../../../fixtures/index'
import {multipleCartItems} from '../../../data/checkout.data'
import { singleCartItems } from '../../../data/checkout.data'
import { expectCartItemsToMatch } from '../../../utils/cartHelper'
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

test('should display correct cart details for multiple products', async ({page, productPage,loggedInUser, viewCartPage }) =>{
      console.log('START TEST URL:', page.url())
       
    await test.step('ensure cart is empty',async({})=>{
        console.log('ensure cart is empty')
         await viewCartPage.goToCart()
         await viewCartPage.removeAllItems()

    })
    await test.step('add multiple items to cart', async () => { 
        console.log('add multiple items to cart')
        await page.goto('https://automationexercise.com/products')
        await addMultipleProducts(multipleCartItems,productPage,page)
     })
     await test.step('verify cart items', async () => { 
        console.log('verify cart items')
         const cartItems = await viewCartPage.getCartItems()
         console.log('cartItems*********',cartItems)
         console.log('multiple cart items', multipleCartItems)
         expect(cartItems).toHaveLength(multipleCartItems.length)
        await expectCartItemsToMatch(cartItems, multipleCartItems)
         })
         })
        test('should display correct cart details for single product', async ({ productPage,loggedInUser,viewCartPage }) => {
            await test.step('add single item to cart', async () => { 
            await productPage.addToCart(multipleCartItems[0].productId) })
            await productPage.viewCart()
            const cartItems = await viewCartPage.getCartItems()
         console.log('cartItems*********',cartItems,multipleCartItems[0].productId)
         console.log('multiple cart items', singleCartItems)
         expect(cartItems).toHaveLength(singleCartItems.length)
        await expectCartItemsToMatch(cartItems, singleCartItems)
              })   
    test('should show empty cart state when cart has no items',async({page,viewCartPage})=>{
        //await test.step('login with existing user ',async()=>{
        //    await  submitLogin(page,loginPage,{email:createdUser.user.email,password:createdUser.user.password})
        //})
        await test.step('go to empty cart',async()=>{
            await viewCartPage.goToCart()
            await expect(page).toHaveURL(/view_cart/)
        })
        await test.step('verify empty cart state is displayed', async () => {    
            await expect(viewCartPage.getEmptyCart()).toBeVisible()
    })
        await test.step('should hide checkout button for empty cart',async()=>{
            await expect(viewCartPage.proceedToCheckoutButton()).toHaveCount(0)
    })
    })




})
