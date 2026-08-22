 import { expect, Locator } from "@playwright/test"
 import { PaymentPage } from "../pages/payment"
import { PaymentDetail } from "../data/payment.data"

 export async function submitPayment(paymentPage:PaymentPage,paymentDetail:PaymentDetail) {
            await paymentPage.fillPaymentDetails(paymentDetail)
            await paymentPage.clickPayAndConfirm()
}

export function getPaymentFieldInputs(paymentPage: PaymentPage): Locator[] {
  const fields = [
    paymentPage.nameOnCardInput,
    paymentPage.cardNumberInput,
    paymentPage.cvcInput,
    paymentPage.expMonthInput,
    paymentPage.expYearInput
  ]
  return fields
}

export async function expectPaymentDetailsToBeCleared(paymentPage:PaymentPage) {
        for(const c of getPaymentFieldInputs(paymentPage)){
            await expect(c).toHaveValue('')
        }
    }
export async function expectPaymentFieldsToBeFilled(paymentPage:PaymentPage) {
        for(const c of getPaymentFieldInputs(paymentPage)){
            await expect(c).not.toHaveValue('')
        }
    }
