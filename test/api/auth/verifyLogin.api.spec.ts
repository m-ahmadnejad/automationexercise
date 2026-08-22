import { test, expect} from '../../../fixtures/index'
test.beforeEach(async({page})=>{
  await page.context().clearCookies()
  await page.goto('/')
  await page.evaluate(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })
})
test('should login successfully with valid credentials @auth  @api @smoke  @regression', async({verifiedLogin})=>{
     expect(verifiedLogin.status).toBe(200)
     expect(verifiedLogin.body.responseCode).toBe(200)
     expect(verifiedLogin.body.message).toBe('User exists!')
})
