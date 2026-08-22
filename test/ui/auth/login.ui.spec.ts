import { test, expect } from '../../../fixtures/index'
test.describe('login - valid credentials',()=>{
    test.beforeEach(async({page})=>{
    await page.goto('https://automationexercise.com/login')
})
test('login using valid email and password    @ui  @auth @regression  @smoke', async({page,loginPage,createdUser})=>{
    await loginPage.login(createdUser.user.email,createdUser.user.password)
    await expect(page.getByText(`Logged in as ${createdUser.user.name} `)).toBeVisible()
})

})
