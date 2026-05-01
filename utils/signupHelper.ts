import { Page,expect,Locator } from "@playwright/test"
import { expectNativeFieldValidation } from "./commonHelper"
import { SignupSecondPage } from "../pages/signUpSecond"
import { SignUpPageFirst } from "../pages/signUpFirst"
import { generateEmail } from "./commonHelper"
import { SignUpInfo} from "../data/signUp.data"

export async function submitSignup(signUpPage:SignUpPageFirst,name:string,email:string){
       await signUpPage.fillSignupForm(name,email)
       await signUpPage.clickSignUpButton()

}
export async function expectSignupNativeValidation(page:Page,signUpPage:SignUpPageFirst,name:string,email:string,input: Locator, expectedMessage: string) {
              await submitSignup(signUpPage,name,email)
              await expectNativeFieldValidation(input, expectedMessage)
              await expect(page).toHaveURL(/\/signup/)
}
export async function performSignupAndCheckNavigation(page:Page,signUpPage:SignUpPageFirst,name:string,email:string,signUpSecondPage:SignupSecondPage) {
       await expect(page).toHaveURL(/signup/)
       await submitSignup(signUpPage,name,email)
}
export async function signUpUser(signUpPage:SignUpPageFirst,signUpSecondPage:SignupSecondPage,page:Page,validSignUpSecondStepData:SignUpInfo) {

              const email =  generateEmail('mojgan')
              await performSignupAndCheckNavigation(page,signUpPage,signUpSecondPage.fillAccountInfo.name,email,signUpSecondPage)
              await signUpSecondPage.completeSignup(validSignUpSecondStepData)
              return{
                     email:email,
                     password:validSignUpSecondStepData.password
              }
       
               }

       
