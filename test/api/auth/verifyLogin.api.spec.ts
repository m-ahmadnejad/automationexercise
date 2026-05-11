import { test, expect} from '../../../fixtures/index'
import { verifyLogin } from '../../../api/client/user.api'
import { verifyLoginCases } from '../../../data/auth.data'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test('should login successfully with valid credentials @auth  @api @smoke  @regression', async({verifiedLogin})=>{
    //const result = await verifyLogin(request, {email:user.email,password:user.password})
    //console.log('result', result)
     expect(verifiedLogin.status).toBe(200)
     expect(verifiedLogin.body.responseCode).toBe(200)
     expect(verifiedLogin.body.message).toBe('User exists!')


})



