import {Page, Locator} from '@playwright/test'

export class LoginPage{
    constructor(private page:Page){
     
    }
    //Use properties instead of methodsv

async login(email:string, password:string){
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
}


readonly emailInput = this.page.locator('.login-form').getByPlaceholder('Email Address')
readonly passwordInput = this.page.getByPlaceholder('Password')
readonly submitButton = this.page.getByRole('button', { name: 'Login' })

 getLoginErrorMessage():Locator{
        return  this.page.locator('.login-form').getByText('Your email or password is incorrect!')
         
}

}