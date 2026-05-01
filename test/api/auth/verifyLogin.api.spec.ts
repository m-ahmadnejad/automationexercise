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
test('should login successfully with valid credentials', async({verifiedLogin})=>{
    //const result = await verifyLogin(request, {email:user.email,password:user.password})
    //console.log('result', result)
     expect(verifiedLogin.status).toBe(200)
     expect(verifiedLogin.body.responseCode).toBe(200)
     expect(verifiedLogin.body.message).toBe('User exists!')


})

for(const c of verifyLoginCases){
    test(`should fail login with empty ${c.name}`, async({request,createdUser})=>{
    const result = await verifyLogin(request, c.data(createdUser.user))
         console.log('result', result)
         console.log('create user.user ******',createdUser.user)
         expect(result.status).toBe(200)
         expect(result.body.responseCode).toBe(404)
         expect(result.body.message).toBe('User not found!')


})
}


