 import { expect, Locator } from "@playwright/test"
 import { PaymentPage } from "../pages/payment"
import { PaymentDetail } from "../data/payment.data"
 
 export async function submitPayment(paymentPage:PaymentPage,paymentDetail:PaymentDetail) {
            await paymentPage.fillPaymentDetails(paymentDetail)
            await paymentPage.clickPayAndConfirm()
}
//👉 Helper Function + Collection Pattern یا ساده‌تر: 👉 جمع کردن Locatorها داخل یک Array برای reuse
//I use a helper function to collect related locators into an array and iterate over them.  This helps me avoid duplication, keeps tests clean, and makes maintenance easier if UI changes.

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
//for input use inputValue() instead of textcontext()
//toBeEmpty() برای این‌ها طراحی شده: <div></div> <span></span>  یعنی content داخل تگ

export async function expectPaymentDetailsToBeCleared(paymentPage:PaymentPage) {

        for(const c of getPaymentFieldInputs(paymentPage)){
            console.log('locator',getPaymentFieldInputs(paymentPage))
            console.log('text conten ', await c.inputValue())
            //const filed = c.inputValue()
            //await expect(filed).toBe('')

            await expect(c).toHaveValue('')
        }
    }
export async function expectPaymentFieldsToBeFilled(paymentPage:PaymentPage) {
        for(const c of getPaymentFieldInputs(paymentPage)){
            //const field = c.inputValue()
            //expect(value).not.toBe('')
            await expect(c).not.toHaveValue('')
        }
    }

//👉 اگر Locator داری → از toHave... استفاده کن    👉 اگر string داری → از toBe... استفاده کن
/*
نوع	مثال	چی هست
Locator	field	اشاره به element
Promise<string>	field.inputValue()	هنوز await نشده
string	await field.inputValue()	مقدار واقعی
*/





