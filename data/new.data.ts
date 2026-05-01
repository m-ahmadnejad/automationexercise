import { Locator } from "@playwright/test"
import { PaymentPage } from "../pages/paymentPage"

export type PaymentDetail = {
  nameOnCard: string
  cardNumber: string
  cvc: string
  expMonth: string
  expYear: string
}

 
export const validPayment: PaymentDetail = {
  nameOnCard: 'Mojgan',
  cardNumber: '1234323321323',
  cvc: '234',
  expMonth: '11',
  expYear: '2026',
}
export type category=  | 'empty'| 'format'| 'length'| 'type'| 'business'

export type SubCategory = 'specialCharacter'| 'invalidEmailFormat' | 'invalidNameFormat'| 'lettersInNumberField'| 
                          'numbersInTextField' | 'tooShort'| 'tooLong'| 'outOfRange'| 'expired'

export type InvalidPaymentCase = {
  name: string
  data:PaymentDetail
  field:keyof PaymentDetail
  expectedError?: string
  category: category
  subCategory? :SubCategory

}

export const invalidPaymentCases_empty :InvalidPaymentCase[]=[
    {name:'empty name on cart', data:{...validPayment,nameOnCard:''}, field:'nameOnCard', category:'empty',expectedError:'Please fill out this field.'},
    {name:'empty card number', data:{...validPayment,cardNumber:''}, field:'cardNumber', category:'empty',expectedError:'Please fill out this field.'},
    {name:'empty cvc', data:{...validPayment,cvc:''}, field:'cvc', category:'empty',expectedError:'Please fill out this field.'},
    {name:'empty exp Months', data:{...validPayment,expMonth:''}, field:'expMonth', category:'empty',expectedError:'Please fill out this field.'},
    {name:'empty exp year', data:{...validPayment,expYear:''}, field:'expYear', category:'empty',expectedError:'Please fill out this field.'},
]
export const invalidPaymentCases_format :InvalidPaymentCase[]=[    
    {name:'wrong format for name on cart-numbersInTextField', data:{...validPayment,nameOnCard:'123'}, field:'nameOnCard', category:'format',subCategory:'numbersInTextField'},
    {name:'wrong format for name on cart-specialCharacter', data:{...validPayment,nameOnCard:'sdaf@!@#'}, field:'nameOnCard', category:'format',subCategory:'specialCharacter'},
    {name:'wrong format for cart number-lettersInNumberField', data:{...validPayment,cardNumber:'adfg'}, field:'cardNumber', category:'format',subCategory:'lettersInNumberField'},
    {name:'wrong format for cart number-specialCharacter', data:{...validPayment,cardNumber:'12@@@@'}, field:'cardNumber', category:'format',subCategory:'specialCharacter'},
]
export const invalidPaymentCases_lenght:InvalidPaymentCase[]=[
    {name:'wrong format for cart number-tooLong', data:{...validPayment,cardNumber:'122111111111111111111111111111111111111'}, field:'cardNumber', category:'length',subCategory:'tooLong'}
]


    /*
       test.describe('negative tests for empty inputs',()=>{
    for(const c of invalidPaymentCases_empty){
        test(`user should not place an order when ${c.name }`,async({page,paymentPage,loggedInUser,readyToPayment})=>{

            await paymentPage.fillPaymentDetails(c.data)
            const input =await paymentPage.inputByField(c.field)
            const uiError = await paymentPage.uiError(input)
             expect(uiError.message).toContain(c.expectedError)
            console.log('validation ',uiError.message,uiError.validation)
             expect(uiError.validation).toBe(false)
            await expect(page).toHaveURL('https://automationexercise.com/payment')
         })
    }
   })
    */