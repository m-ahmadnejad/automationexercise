export type PaymentDetail = {
  nameOnCard:string,
  cardNumber:string,
  cvc:string,
  expMonths:string,
  expYear:string
}

export const validPaymentDetails :PaymentDetail={nameOnCard:'Mojgan',cardNumber:'1234323321323',cvc:'234',expMonths:'11',expYear:'1990'}

export const invalidPayment:Record<string,PaymentDetail> ={
  emptyNameOnCard:{...validPaymentDetails,nameOnCard:''},
  emptyCardNumber:{...validPaymentDetails,cardNumber:''},
  emptyCVC:{...validPaymentDetails,cvc:''},
  emptyExpMonth:{...validPaymentDetails,expMonths:''},
  emptyExpYear:{...validPaymentDetails,expYear:''}
  
}
   




  