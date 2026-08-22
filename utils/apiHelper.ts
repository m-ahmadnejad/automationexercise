import { generateEmail } from "./commonHelper"
import { CreateUserPayload, CreateUserResult } from "../api/types/userApi.types"
import { validSignUpSecondStepData } from "../data/signUp.data"
import {mapSignUpToCreateUserPayLoad  } from "../api/mappers/user.mappers"
import { AuthPayload, AuthResult } from "../api/types/authApi.types"
import {APIRequestContext} from '@playwright/test'
import { deleteAccount } from "../api/client/user.api"

export function buildValidCreateUserPayload(
  overrides?: Partial<CreateUserPayload>): CreateUserPayload {
  const basePayload = mapSignUpToCreateUserPayLoad(generateEmail('TestUser'),'TestUser',validSignUpSecondStepData )

  return {
    ...basePayload,
    ...overrides,
  }
}
  export async function deleteUserAccount(request:APIRequestContext,payLoad:AuthPayload){
       return await deleteAccount(request,payLoad)
  }
