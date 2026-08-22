import {test, expect} from '../../../fixtures/index'
import { invalidSignUpCases, invalidSignUpCases_business } from '../../../data/signUp.data'
import { submitSignup, expectSignupNativeValidation } from '../../../utils/signupHelper'

test.describe('sign up - invalid details',()=>{
       test.beforeEach(async({page})=>{
              await page.goto('https://automationexercise.com/signup')
              })

for (const c of invalidSignUpCases){
       test(`should show native validation for ${c.name} @ui @account @regression @negative`, async({page,signUpPage})=>{
              const data = c.data()
              const input = c.field === 'email' ? signUpPage.emailInput() : signUpPage.nameInput()
              await expectSignupNativeValidation(page,signUpPage,data.name,data.email,input,c.expectedError)
       })
}

for (const c of invalidSignUpCases_business){
       test(`should reject signup when ${c.name} @ui @account @regression @negative`, async({page,signUpPage})=>{
              const data = c.data()
              await submitSignup(signUpPage,data.name,data.email)
              await expect(signUpPage.getDuplicateEmailMessage()).toContainText(c.expectedError)
              await expect(page).toHaveURL(/signup/)
       })
}
})
