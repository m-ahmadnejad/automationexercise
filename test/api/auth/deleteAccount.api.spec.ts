import {test, expect} from '../../../fixtures/index'
import { verifyLogin } from '../../../api/client/user.api'
import { deleteUserAccount } from '../../../utils/apiHelper'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})

test('verify user cannot login via API after account deletion via API @account @auth @negative @api @regression', async({request,createdUserForDelete})=>{
   const deleteResult = await deleteUserAccount(request,createdUserForDelete.user)
   expect(deleteResult.status).toBe(200)
   expect(deleteResult.body.responseCode).toBe(200)
   expect(deleteResult.body.message).toBe('Account deleted!')

   const loginResult = await verifyLogin(request,createdUserForDelete.user)
   expect(loginResult.status).toBe(200)
   expect(loginResult.body.responseCode).toBe(404)
   expect(loginResult.body.message).toBe('User not found!')
})
