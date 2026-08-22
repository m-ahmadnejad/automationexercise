import {Page, Locator} from '@playwright/test'
import { PaymentDetail } from '../data/payment.data'
export class PaymentPage{
    constructor(private page:Page){
    }
 getPaymentHeading():Locator{
    return this.page.getByRole('heading', { name: 'Payment' })
}
 async fillPaymentDetails(payment:PaymentDetail){
    await this.cardNumberInput.fill(payment.cardNumber)
    await this.nameOnCardInput.fill(payment.nameOnCard)
    await this.cvcInput.fill(payment.cvc)
    await this.expMonthInput.fill(payment.expMonths)
    await this.expYearInput.fill(payment.expYear)
 }
 async clickPayAndConfirm(){
    await this.page.getByRole('button',{name:'Pay and Confirm Order'}).click()
 }


readonly cardNumberInput = this.page.locator('[name="card_number"]')
readonly nameOnCardInput = this.page.locator('[name="name_on_card"]')
readonly cvcInput = this.page.locator('[name="cvc"]')
readonly expMonthInput = this.page.locator('[name="expiry_month"]')
readonly expYearInput = this.page.getByPlaceholder('YYYY')
readonly payButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' })


}