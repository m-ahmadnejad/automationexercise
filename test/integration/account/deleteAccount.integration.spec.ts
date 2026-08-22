import {test, expect} from '../../../fixtures/index'
import { submitLogin } from '../../../utils/authHelper/authHelper'
import { deleteUserAccount } from '../../../utils/apiHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test('should not allow login via UI after account deletion via API @integration @account @ui @api @auth  @negative @regression', async({request,page,loginPage,createdUserForDelete})=>{
   const result = await deleteUserAccount(request,createdUserForDelete.user)
   expect(result.status).toBe(200)
   expect(result.body.responseCode).toBe(200)
   expect(result.body.message).toBe('Account deleted!')

   await page.goto('/signup')
   await submitLogin(page,loginPage,{email:result.user.email,password:result.user.password})
   const errorMessage =  loginPage.getLoginErrorMessage()
   await expect( errorMessage).toBeVisible()
   expect(await errorMessage.textContent()).toContain('incorrect!')
})
