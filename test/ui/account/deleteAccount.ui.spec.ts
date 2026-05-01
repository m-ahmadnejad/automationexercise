import{test, expect} from '../../../fixtures/index'
test('should delete account successfully through the UI ', async ({ loggedInUser, deletePage,page }) => {

    await deletePage.clickDeleteButton()
    await expect(deletePage.getAccountDeleteHeader()).toBeVisible()

  await expect(deletePage.getAccountDeleteHeader()).toContainText('Account Deleted!')
  await deletePage.clickContinueButton()
})