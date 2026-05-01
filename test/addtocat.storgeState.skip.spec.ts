/*
test.describe.skip('cart',()=>{
    type UiItems = Item[]
    test.skip('should add multiple products to cart and display correct details',async({page,user,productPage,viewCartPage})=>{
         await productPage.addMultipleProduct(items)
         const uiItems = await viewCartPage.getCartItems(items)
         expect(uiItems).toHaveLength(items.length)
         for(const expectedItem of items){
             const matched = uiItems.find(p=>p.name===expectedItem.name)
            expect(matched).toBeTruthy()
            expect(matched?.price).toBe(expectedItem.price)
            expect(matched?.quantity).toBe(expectedItem.quantity)
    }
   })
})*/