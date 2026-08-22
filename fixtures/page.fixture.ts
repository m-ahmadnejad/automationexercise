import {test as base, Page} from '@playwright/test'
import { LoginPage } from '../pages/login'
import { ProductPage } from '../pages/productPage'
import { ViewCartPage } from '../pages/viewCart'
import { CheckoutPage } from '../pages/checkout'
import { PaymentPage } from '../pages/payment'
import { PaymentDonePage } from '../pages/paymentDone'
import { SignUpPageFirst } from '../pages/signUpFirst'
import { DeletePage } from '../pages/deleteAccount'
import { SignupSecondPage } from '../pages/signUpSecond'
import { LogOutPage } from '../pages/logOut'
import { blockAds } from '../utils/popupHandlers'

export type PageFixtures = {
  loginPage: LoginPage,
  productPage : ProductPage,
  viewCartPage : ViewCartPage,
  checkoutPage:CheckoutPage,
  paymentPage :PaymentPage,
  paymentDonePage:PaymentDonePage,
  signUpPage: SignUpPageFirst,
  signUpSecondPage: SignupSecondPage,
  deletePage: DeletePage
  logOutPage:LogOutPage
  page:Page
 }
 export type PageFixtureDefs = Parameters<typeof base.extend<PageFixtures>>[0] 
 export const pageTestFixtures: PageFixtureDefs = {

  loginPage:async({page},use) => {
    await use(new LoginPage(page))
  },
  signUpPage:async({page},use)=>{
    await use(new SignUpPageFirst(page))
  },
    signUpSecondPage:async({page},use)=>{
    await use(new SignupSecondPage(page))
  },
  deletePage:async({page},use)=>{
    await use(new DeletePage(page))
  },
 productPage : async({page},use)=>{
    await use(new ProductPage(page))
  },
  viewCartPage:async({page},use)=>{
    await use(new ViewCartPage(page))
  },
  checkoutPage:async({page},use)=>{
    await use(new CheckoutPage(page))
  },
  paymentPage:async({page},use)=>{
    await use(new PaymentPage(page))
  },
    paymentDonePage:async({page},use)=>{
    await use(new PaymentDonePage(page))
  },
  logOutPage:async({page},use)=>{
    await use(new LogOutPage(page))
  },
  page:async({page},use)=>{
    await blockAds(page)
    await use(page)
  }

 }
