import { test, expect } from '../../../fixtures/index'
import { submitLogin,assertLoginNativeValidation } from '../../../utils/authHepler/authHelper'
import {invalidCredentialCases,loginvalidationCases} from '../../../data/auth.data'
test.describe('login validdation ',()=>{
    test.beforeEach(async({page})=>{
    await page.goto('https://automationexercise.com/login')
})
test('login using valid email and password', async({page,loginPage,createdUser})=>{
    await loginPage.login(createdUser.user.email,createdUser.user.password)
    await expect(page.getByText(`Logged in as ${createdUser.user.name} `)).toBeVisible()
})
    for(const c of loginvalidationCases){
        
        test(`should show native validation ${c.name} `, async({page,loginPage})=>{
            const input = c.field==='email'?loginPage.emailInput:loginPage.passwordInput
        await assertLoginNativeValidation(loginPage,input,page,c.data.email,c.data.password,c.data.message)
       
      })
    }
    for(const c of invalidCredentialCases){
        test(`should reject invalid credentials ${c.name} `, async({page,loginPage})=>{
        await submitLogin(page,loginPage,{email:c.data.email,password:c.data.password})
        const errorMessage = await loginPage.getLoginErrorMessage()
        await expect( errorMessage).toBeVisible()
        expect(await errorMessage.textContent()).toContain('incorrect!')

      
      })
}
})
