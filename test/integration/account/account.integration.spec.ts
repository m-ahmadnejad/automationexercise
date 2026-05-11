import { verifyLogin } from '../../../api/client/user.api'
import{test, expect} from '../../../fixtures/index'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})

//UI action → API validation    این اسمش چیه؟   Cross-layer validation
test.describe('delete account',()=>{
 test('should delete account via UI and verify deletion via API @integration @ui @account @api  @regression', async({request,createdUser,deletePage,page,loggedInUser})=>{
   console.log('url in deltee test ',page.url())
   await deletePage.clickDeleteButton()
      console.log('url in deltee test ',page.url())
   await expect(deletePage.DeleteButton()).not.toBeVisible()
   await expect(deletePage.getAccountDeleteHeader()).toContainText('Account Deleted!')
   // await deletePage.continueButtonClick()
   //verify using api
await test.step('verify login after deletion via api ', async () => {
  const result = await verifyLogin(request, {
    email: createdUser.user.email,
    password: createdUser.user.password
  })
  expect(result.status).toBe(200)
  expect(result.body.responseCode).toBe(404)
  expect(result.body.message).toBe('User not found!')

})
   })

})
