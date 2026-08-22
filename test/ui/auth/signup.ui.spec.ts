import {test, expect} from '../../../fixtures/index'
import { validSignUpSecondStepData, signUpFirstStepUsers } from '../../../data/signUp.data'
import {performSignupAndCheckNavigation} from '../../../utils/signupHelper'
import { generateEmail } from '../../../utils/commonHelper'
test.describe('sign up',()=>{
       test.beforeEach(async({page})=>{
              await page.goto('https://automationexercise.com/signup')
              })
test(' sign up using valid data  @account @ui @smoke @regression', async({page,signUpPage,signUpSecondPage})=>{
   const email =  generateEmail('mojgan')
   await performSignupAndCheckNavigation(page,signUpPage,signUpFirstStepUsers.validUser.name,email,signUpSecondPage)
   await expect(signUpSecondPage.getSignupHeader()).toBeVisible()
   //page 2
   await signUpSecondPage.completeSignup(validSignUpSecondStepData)
   await expect(signUpSecondPage.getAccountCreatedTitle()).toBeVisible()
   await expect(page).toHaveURL(/account_created/)
})
     
})
