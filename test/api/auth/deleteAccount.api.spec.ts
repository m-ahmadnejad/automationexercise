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

//🔴 Your test is:  👉 Cross-feature validation:  account deletion login authentication API consistency  👉 That’s bigger than sanity

//🔴 Sanity = testing AFTER a specific change Ask yourself: 👉 Did you JUST change:  delete account logic?  login API behavior?If NO → not sanity

test('verify user can not login via API after account deletion via API  @account @auth @negative @api @regression', async({page,loginPage,createdUserForDelete,request,verifiedLogin})=>{
   //await expect(deletePage.AccountDeleteHeader()).toBeVisible()
   //await expect(deletePage.AccountDeleteHeader()).toContainText('Account Deleted!')
   //await deletePage.continueButtonClick()
   const result = await deleteUserAccount(request,createdUserForDelete.user)
   expect(result.status).toBe(200)
   expect(result.body.responseCode).toBe(200)
   expect(result.body.message).toBe('Account deleted!')

    expect(verifiedLogin.status).toBe(200)
     expect(verifiedLogin.body.responseCode).toBe(200)
     expect(verifiedLogin.body.message).not.toBe('User exists!')

})

/* 
Ask yourself:
"If this test fails, WHICH business area is broken?"

In this test:

If fail means:

deleted users can still log in

That is:

AUTH problem

NOT mainly account problem.
*/

