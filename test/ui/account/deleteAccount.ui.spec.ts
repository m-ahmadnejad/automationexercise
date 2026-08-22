import{test, expect} from '../../../fixtures/index'
import { submitLogin } from '../../../utils/authHelper/authHelper'

test('should delete account successfully through the UI @account @ui @regression  ', async ({ page, loginPage, createdUserForDelete, deletePage }) => {
    await submitLogin(page,loginPage,createdUserForDelete.user)
    await expect(page.getByText(/Logged in as/i)).toBeVisible()
    await deletePage.clickDeleteButton()
    await expect(deletePage.getAccountDeleteHeader()).toBeVisible()
    await expect(deletePage.getAccountDeleteHeader()).toContainText('Account Deleted!')
    await deletePage.clickContinueButton()
})
