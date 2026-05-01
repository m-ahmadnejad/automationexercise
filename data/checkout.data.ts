export type ProductItem = {
  id:number,
  name: string
  price: number
  quantity: number
 }
export type CheckoutItem = ProductItem & {totalPrice: number}

 export const multipleCartItems:ProductItem[]=
[
  {id:1,name:'Blue Top', price:500,quantity:1},
  {id:2,name:'Men Tshirt', price:400,quantity:1}
]


 export const singleCartItems:ProductItem[]=
[
  {id:1,name:'Blue Top', price:500,quantity:1}
]



