import { Locator, Page } from '@playwright/test'
import { SignUpInfo } from '../data/signUp.data'

export class SignupSecondPage {
  constructor(private page: Page) {}

  readonly signupHeader: Locator = this.page.getByText('Enter Account Information')
  readonly passwordInput: Locator = this.page.locator('#password')
  readonly firstNameInput: Locator = this.page.locator('#first_name')
  readonly lastNameInput: Locator = this.page.locator('#last_name')
  readonly companyInput: Locator = this.page.locator('#company')
  readonly address1Input: Locator = this.page.locator('#address1')
  readonly address2Input: Locator = this.page.locator('#address2')
  readonly stateInput: Locator = this.page.locator('#state')
  readonly cityInput: Locator = this.page.locator('#city')
  readonly zipCodeInput: Locator = this.page.locator('#zipcode')
  readonly mobileNumberInput: Locator = this.page.locator('#mobile_number')
  readonly continueButton: Locator = this.page.getByText('Continue')

  getSignupHeader(): Locator {
    return this.signupHeader
  }

  async selectMaleGender() {
    await this.page.locator('#id_gender1').check()
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async fillDateOfBirth(days: string, months: string, years: string) {
    await this.page.locator('#days').selectOption(days)
    await this.page.locator('#months').selectOption(months)
    await this.page.locator('#years').selectOption(years)
  }

  async checkNewsletter() {
    await this.page.locator('#newsletter').check()
  }

  async checkSpecialOffers() {
    await this.page.getByLabel('Receive special offers from our partners!').check()
  }

  async fillAccountInfo(data: SignUpInfo) {
    await this.selectMaleGender()
    await this.fillPassword(data.password)
    await this.fillDateOfBirth(data.days, data.months, data.years)
    await this.checkNewsletter()
    await this.checkSpecialOffers()
  }

  async selectCountry(countryName: string) {
    await this.page.locator('#country').selectOption(countryName)
  }

  async fillAddressInfo(data: SignUpInfo) {
    await this.firstNameInput.fill(data.firstName)
    await this.lastNameInput.fill(data.lastName)
    await this.companyInput.fill(data.company)
    await this.address1Input.fill(data.address)
    await this.address2Input.fill(data.address2)
    await this.selectCountry(data.country)
    await this.stateInput.fill(data.state)
    await this.cityInput.fill(data.city)
    await this.zipCodeInput.fill(data.zipCode)
    await this.mobileNumberInput.fill(data.mobileNumber)
  }

  async clickCreateAccount() {
    await this.page.getByRole('button', { name: 'Create Account' }).click()
  }

  async completeSignup(data: SignUpInfo) {
    await this.fillAccountInfo(data)
    await this.fillAddressInfo(data)
    await this.clickCreateAccount()
  }

  getAccountCreatedTitle(): Locator {
    return this.page.locator('h2.title.text-center').getByText('Account Created!')
  }

  async clickContinue() {
    await this.continueButton.click()
  }
}