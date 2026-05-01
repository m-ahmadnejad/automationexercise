import {test,expect, chromium} from '@playwright/test'

export default async ()=> {
    const browser = await chromium.launch()
    const page    = await browser.newPage()
      await page.goto('https://automationexercise.com/login')

  await page.fill('[data-qa="login-email"]', 'Mojgan1a@yahoo.com')
  await page.fill('[data-qa="login-password"]', '123')
  await page.click('[data-qa="login-button"]')

  await page.waitForURL('https://automationexercise.com/')
  await page.context().storageState({
    path: 'playwright/.auth/user.json'
  })
    await browser.close()
}

/*
ما دو روش برای ساخت storgestate داریم :
global setup : و  که میایم مرگرور و پیج ومیسازیم در کانفیگ میگیم قبل از هر ران اینو اجرا کن و نتیجه رو در فایل ذخیره کن و میگیم که از این فایلی که 
ساخته شده استفاده کنه
manual setup
تقریبا همون مراحل رو داره ولی از مروگر و پیج جدید استفاده نمیشه و نیازی هم نیست تو کانفگی بگیم که گلوبال هست بنابراین قبل از هر تست ران ساخته نمیشه
و اگر بخوایم باید دستی اجرا کنیم ولی در کانفیگ میگیم که یوز بشه

یه حالتی هم هست که یوز رو تو تست میگیم که خیلی خوب نیست
storageState:

1. global-setup.ts → login
2. save:
   page.context().storageState()
3. config:
   globalSetup + storageState
4. tests:
   no login → page.goto('/')
   */