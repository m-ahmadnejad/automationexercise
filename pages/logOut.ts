import {Page} from '@playwright/test'
export class LogOutPage{
    constructor(private page:Page){
    }

     async logOut(){
          await this.page.getByRole('link',{name:' Logout'}).click()
    }
}