import {test, expect} from '../../../fixtures/index'
import { signUpFirstStepUsers, signUpValidationCases, validSignUpSecondStepData } from '../../../data/signUp.data'
import { expectSignupNativeValidation, performSignupAndCheckNavigation, submitSignup } from '../../../utils/signupHelper'
import { generateEmail } from '../../../utils/commonHelper'
test.describe('sign up',()=>{
       test.beforeEach(async({page})=>{
              await page.goto('https://automationexercise.com/signup')
              })
test(' sign up using valid data  @account @ui @smoke @regression', async({page,signUpPage,signUpSecondPage})=>{
   const email =  generateEmail('mojgan')
   await performSignupAndCheckNavigation(page,signUpPage,signUpSecondPage.fillAccountInfo.name,email,signUpSecondPage)
   await expect(signUpSecondPage.getSignupHeader()).toBeVisible()
   //page 2
   await signUpSecondPage.completeSignup(validSignUpSecondStepData)
   await expect(signUpSecondPage.getAccountCreatedTitle()).toBeVisible()
   await expect(page).toHaveURL(/account_created/)
})
     
})
