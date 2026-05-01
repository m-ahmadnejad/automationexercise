import {test, expect} from '../../../fixtures/index'
import { submitLogin } from '../../../utils/authHepler/authHelper'
import { deleteUserAccount } from '../../../utils/apiHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test('verify user can not login via API after account deletion via API', async({page,loginPage,createdUserForDelete,request})=>{
   //await expect(deletePage.AccountDeleteHeader()).toBeVisible()
   //await expect(deletePage.AccountDeleteHeader()).toContainText('Account Deleted!')
   //await deletePage.continueButtonClick()
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

