import { Page,expect,Locator } from "@playwright/test"
import { LoginPage } from "../../pages/login"
import { expectNativeFieldValidation } from "../commonHelper"
import { DeletePage } from "../../pages/deleteAccount"
import { handleGoogleVignetteAd } from "../popupHandlers"


export async function submitLogin(page:Page,loginPage:LoginPage,user:{email:string,password:string}) {
     await page.goto('/login')
     await loginPage.login(user.email,user.password)

}

export async function assertLoginNativeValidation(loginPage:LoginPage,input:Locator,page:Page,email:string,password:string,expectedMessage:string) {
    await loginPage.login(email,password)
    await expectNativeFieldValidation(input,expectedMessage)
    await expect(page).toHaveURL('/login')
 
}


