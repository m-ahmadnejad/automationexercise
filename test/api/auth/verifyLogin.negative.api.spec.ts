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

for(const c of verifyLoginCases){
    test(`should fail login with  @auth  @api @negative @regression ${c.name}`, async({request,createdUser})=>{
    const result = await verifyLogin(request, c.data(createdUser.user))
         expect(result.status).toBe(200)
         expect(result.body.responseCode).toBe(404)
         expect(result.body.message).toBe('User not found!')
})
}
