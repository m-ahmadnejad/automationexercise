import{Page,Locator} from '@playwright/test'

export class PaymentDonePage {
    constructor(private page:Page){
    }

  getOrderPlacedMessage(): Locator {
    return this.page.getByText('Order Placed!')
  }

  getConfirmationMessage(): Locator {
    return this.page.getByText('Congratulations! Your order has been confirmed!')
  }

   async clickDownloadInvoice(){
    await this.page.getByText('Download Invoice').click()
   }

   async clickContinue():Promise<void>{
    await this.page.getByText('Continue').click()
   }

}