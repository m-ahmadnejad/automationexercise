import { verifyLogin } from '../../../api/client/user.api'
import{test, expect} from '../../../fixtures/index'
import { submitLogin } from '../../../utils/authHelper/authHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})

test.describe('delete account',()=>{
 test('should delete account via UI and verify deletion via API @integration @ui @account @api  @regression', async({request,createdUserForDelete,deletePage,page,loginPage})=>{
   await submitLogin(page,loginPage,createdUserForDelete.user)
   await expect(page.getByText(/Logged in as/i)).toBeVisible()
   await deletePage.clickDeleteButton()
   await expect(deletePage.DeleteButton()).not.toBeVisible()
   await expect(deletePage.getAccountDeleteHeader()).toContainText('Account Deleted!')
   await test.step('verify login after deletion via api ', async () => {
     const result = await verifyLogin(request, {
       email: createdUserForDelete.user.email,
       password: createdUserForDelete.user.password
     })
     expect(result.status).toBe(200)
     expect(result.body.responseCode).toBe(404)
     expect(result.body.message).toBe('User not found!')
   })
 })
})
