import {Page, Locator} from '@playwright/test'
import { PaymentDetail } from '../data/payment.data'
export class PaymentPage{
    constructor(private page:Page){
    }
 getPaymentHeading():Locator{
    return this.page.getByRole('heading', { name: 'Payment' })
}
 async fillPaymentDetails(Payment:PaymentDetail){
    await this.cardNumberInput.fill(Payment.cardNumber)
    await this.nameOnCardInput.fill(Payment.nameOnCard)
    await this.cvcInput.fill(Payment.cvc)
    await this.expMonthInput.fill(Payment.expMonths)
    await this.expYearInput.fill(Payment.expYear)
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