import { Locator, Page } from "@playwright/test"
export class SignUpPageFirst{
    constructor(private page:Page){

    }
    async fillSignupForm(name:string, email:string){
        await this.nameInput().fill(name)
        await this.emailInput().fill(email)
    }
    async clickSignUpButton(){
         await this.page.getByRole('button',{name:'Signup'}).click()
    }
     emailInput():Locator{
        return  this.page.locator('[data-qa="signup-email"]')
    }
     nameInput():Locator{
        return  this.page.locator('[data-qa="signup-name"]')
    }
    getDuplicateEmailMessage(): Locator {
        return this.page.locator('.signup-form form p', {
        hasText: 'Email Address already exist!'
  })
}

}