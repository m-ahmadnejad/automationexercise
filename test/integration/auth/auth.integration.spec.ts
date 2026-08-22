import {test, expect} from '../../../fixtures/index'
import { validSignUpSecondStepData,signUpFirstStepUsers } from '../../../data/signUp.data'
import { verifyLogin } from '../../../api/client/user.api'
import { generateEmail } from '../../../utils/commonHelper'
import { submitSignup } from '../../../utils/signupHelper'
import { deleteUserAccount } from '../../../utils/apiHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test.describe('auth',()=>{
   test('should create account via UI and verify it exists via API @account @integration  @api @ui @smoke @regression', async({page,signUpPage,signUpSecondPage,request})=>{
   await page.goto('/login')
   const email =  generateEmail('testUser')
   await submitSignup(signUpPage,signUpFirstStepUsers.validUser.name,email)
   await expect(page).toHaveURL(/\/signup/)
   await expect(signUpSecondPage.getSignupHeader()).toBeVisible()
   //page 2
   await signUpSecondPage.completeSignup(validSignUpSecondStepData)
   await expect(signUpSecondPage.getAccountCreatedTitle()).toBeVisible()
   await expect(page).toHaveURL(/account_created/)
   const response = await verifyLogin(request,{email:email,password:validSignUpSecondStepData.password})
   expect(response.status).toBe(200)
   expect(response.body.responseCode).toBe(200)
   expect(response.body.message).toBe('User exists!')

   await deleteUserAccount(request,{email:email,password:validSignUpSecondStepData.password})
   })

test('should login via UI with existing API-created user @integration @ui @api @auth  @smoke  @regression', async({request,page,createdUser,loginPage})=>{
    await page.goto('/signup')
    await loginPage.login(createdUser.user.email,createdUser.user.password)

    await expect(page.getByText(`Logged in as ${createdUser.user.name}`)).toBeVisible()
    const result = await verifyLogin(request,{email:createdUser.user.email,password:createdUser.user.password})
    expect(result.status).toBe(200)
    expect(result.body.responseCode).toBe(200)
    expect(result.body.message).toBe('User exists!')
})
})
