import {test, expect} from '../../../fixtures/index'
import { signUpFirstStepUsers, signUpValidationCases, validSignUpSecondStepData } from '../../../data/signUp.data'
import { expectSignupNativeValidation, performSignupAndCheckNavigation, submitSignup } from '../../../utils/signupHelper'
import { generateEmail } from '../../../utils/commonHelper'
test.describe('sign up',()=>{
       test.beforeEach(async({page})=>{
              await page.goto('https://automationexercise.com/signup')
              })
test(' sign up using valid data', async({page,signUpPage,signUpSecondPage})=>{
   const email =  generateEmail('mojgan')
   await performSignupAndCheckNavigation(page,signUpPage,signUpSecondPage.fillAccountInfo.name,email,signUpSecondPage)
   await expect(signUpSecondPage.getSignupHeader()).toBeVisible()
   //page 2
   await signUpSecondPage.completeSignup(validSignUpSecondStepData)
   await expect(signUpSecondPage.getAccountCreatedTitle()).toBeVisible()
   await expect(page).toHaveURL(/account_created/)
})
       for(const c of signUpValidationCases){
         test(`sign up with ${c.name}`,async({page,signUpPage})=>{
                const input = c.field ==='email' ?signUpPage.emailInput():signUpPage.nameInput()
                await expectSignupNativeValidation(page,signUpPage,c.data.name,c.data.email,input,c.data.expectedMessage)
                console.log('name---------',c.data.name,'email________',c.data.email,await page.url(),'error--------',c.data.expectedMessage)
                await expect(page).toHaveURL(/signup/)
                                                            })
       }
test('should show an error for an already registered email', async({page,signUpPage})=>{
       await submitSignup(signUpPage,signUpFirstStepUsers.existingUser.name,signUpFirstStepUsers.existingUser.email)
       await expect(signUpPage.getDuplicateEmailMessage()).toContainText('already exist')
       await expect(page).toHaveURL(/signup/)
})
})
