import {test, expect} from '../../../fixtures/index'
import { signUpFirstStepUsers, signUpValidationCases, validSignUpSecondStepData } from '../../../data/signUp.data'
import { expectSignupNativeValidation, performSignupAndCheckNavigation, submitSignup } from '../../../utils/signupHelper'
import { generateEmail } from '../../../utils/commonHelper'
test.describe('sign up',()=>{
       test.beforeEach(async({page})=>{
              await page.goto('https://automationexercise.com/signup')
              })

test('should show an error for an already registered email  @ui @account  @regression @negative', async({page,signUpPage})=>{
       await submitSignup(signUpPage,signUpFirstStepUsers.existingUser.name,signUpFirstStepUsers.existingUser.email)
       await expect(signUpPage.getDuplicateEmailMessage()).toContainText('already exist')
       await expect(page).toHaveURL(/signup/)
})
})
