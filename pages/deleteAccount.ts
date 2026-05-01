import{Locator, Page} from '@playwright/test'
import { handleGoogleVignetteAd } from '../utils/popupHandlers'

export class DeletePage{
    constructor(private page:Page){
    }
// chat gpt said for locator you dont need to use method just a store locator directly
//readonly deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' })
    async clickDeleteButton(){
         await this.page.locator('.nav.navbar-nav').getByRole('link',{name:'Delete Account'}).click()

    }
         DeleteButton():Locator{
        return  this.page.locator('.nav.navbar-nav').getByRole('link',{name:'Delete Account'})

    }

     getAccountDeleteHeader():Locator{
    return this.page.getByText('Account Deleted!')
     }

    async clickContinueButton(){
          await this.page.locator('[data-qa="continue-button"]').click()
    }
    
 async  deleteAccount() {
    await this.clickDeleteButton()
    await handleGoogleVignetteAd(this.page)
    await this.clickDeleteButton()
    
}
}
