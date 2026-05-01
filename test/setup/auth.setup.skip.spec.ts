/*import { test, expect } from '../../fixtures/page.fixture'
import { LoginPage } from '../../pages/login'
test.skip('Login and save auth state',async ({page,user})=>{
    await page.goto('https://automationexercise.com/login')
    const loginPage = new LoginPage(page)
    await loginPage.login(user.email,user.password)
    
    await loginPage.clickSubmit()
    await expect(page).toHaveURL('https://automationexercise.com/')
    await expect(page.getByText('Logged in as ')).toBeVisible()

    await page.context().storageState({path:'playwright/.auth/user.json'})

})*/