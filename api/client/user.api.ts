import {APIRequestContext} from '@playwright/test'
import {CreateUserPayload, CreateUserResult } from '../types/userApi.types'
import { AuthPayload } from '../types/authApi.types'

export async function createUser(request:APIRequestContext,payLoad:CreateUserPayload):Promise<CreateUserResult>
//👉 Promise = “I will give you the result later, not now”
//Every async function returns a Promise
//👌 Final simple sentence  👉 “We use Promise because the result is not ready immediately”
 {
    
    const response =await request.post('https://automationexercise.com/api/createAccount',{
        form:payLoad 
    })
    console.log('response#############', response)
    const body = await response.json()
    console.log('response json()()()()', body)
    return {user:payLoad, body,status:response.status()}
//return payLoad
}

export async function verifyLogin(request:APIRequestContext, payLoad:AuthPayload)
{
    const response = await request.post('https://automationexercise.com/api/verifyLogin',
    {
        form:{email: payLoad.email,password:payLoad.password}
    })
    console.log('response&&&&&', response)
    const body = await response.json()
    console.log('response json*******', body)
    console.log('payload &&&&&&&&&&&&&&',payLoad)
    return { user:payLoad, body,status:response.status()}
}

export async function deleteAccount(request:APIRequestContext,payLoad:AuthPayload) {
    const response = await request.delete('https://automationexercise.com/api/deleteAccount',{

        form:{email:payLoad.email,password:payLoad.password}
    })
    console.log('response&&&&&', response)
    const body = await response.json()
    console.log('response json*******', body)
    return { user:payLoad, body,status:response.status()}
    
}
