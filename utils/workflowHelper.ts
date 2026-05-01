import { ProductPage } from "../pages/productPage"
import { ViewCartPage } from "../pages/viewCart"
import { ProductItem } from "../data/checkout.data"
import { addMultipleProducts } from "./cartHelper"
import { CheckoutPage } from "../pages/checkout"
import { PaymentPage } from "../pages/payment"
import { PaymentDetail } from "../data/payment.data"


export async function addToCartAndProceedToCheckout(productPage:ProductPage,viewCartPage:ViewCartPage,multipleCartItems:ProductItem[]) {
    await addMultipleProducts(multipleCartItems,productPage)
    await viewCartPage.clickProceedToCheckout()
    
}

export async function addToCartAndPlaceOrder(productPage:ProductPage,viewCartPage:ViewCartPage,checkoutPage:CheckoutPage,items:ProductItem[]) {
    await addToCartAndProceedToCheckout(productPage,viewCartPage,items)
    await checkoutPage.placeOrder()
    
   }

export async function  completeWorkFlow(paymentPage:PaymentPage,validPaymentDetails:PaymentDetail) {
      await paymentPage.fillPaymentDetails(validPaymentDetails)
      await paymentPage.clickPayAndConfirm()
    }
