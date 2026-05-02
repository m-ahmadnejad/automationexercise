export type ProductItem = {
  productId:number
  name: string
  price: number
  quantity: number
 }
 export type ProductItemResult = {
  name: string
  price: number
  quantity: number
 }
export type CheckoutItem = ProductItem & {totalPrice: number}

 export const multipleCartItems:ProductItem[]=
[
  {productId:1,name:'Blue Top', price:500,quantity:1},
  {productId:2,name:'Men Tshirt', price:400,quantity:1}
]


 export const singleCartItems:ProductItem[]=
[
  {productId:1,name:'Blue Top', price:500,quantity:1}
]



