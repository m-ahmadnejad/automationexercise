import { test as base } from '@playwright/test'
import { buildValidCreateUserPayload } from '../utils/apiHelper'
import { createUser, deleteAccount, verifyLogin } from '../api/client/user.api'
import { CreateUserResult } from '../api/types/userApi.types'
import { AuthResult } from '../api/types/authApi.types'

export type ApiFixtures = {
  createdUser: CreateUserResult
  verifiedLogin: AuthResult
  createdUserForDelete:CreateUserResult

}

export type ApiFixtureDef = Parameters<typeof base.extend<ApiFixtures>>[0]
 
export const apiTestFixture: ApiFixtureDef = {
  createdUser: async ({ request }, use) => {
    const payload = buildValidCreateUserPayload()
    const createdUser = await createUser(request, payload)
    await use(createdUser)
    await deleteAccount(request, {
    email: createdUser.user.email,
    password: createdUser.user.password,
  })
  },

  createdUserForDelete: async ({ request }, use) => {
    const payload = buildValidCreateUserPayload()
    const createdUser = await createUser(request, payload)
    await use(createdUser)

  },

  verifiedLogin: async ({ request, createdUser }, use) => {
    const result = await verifyLogin(request, {
      email: createdUser.user.email,
      password: createdUser.user.password,
    })
    await use(result)
  },
}