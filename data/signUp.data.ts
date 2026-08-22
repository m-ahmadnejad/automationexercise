import { generateEmail } from "../utils/commonHelper"

export const emailPrefixAndName={prefix:'Mojgan',name:'Mojgan'}

export type SignUpInfo = {
  password:string
  firstName: string
  lastName: string
  company: string
  address: string
  address2: string
  state: string
  country: string
  city: string
  zipCode: string
  mobileNumber: string
  days: string
  months: string
  years: string
}
/*If you only need one user, use:

export const validSignUpUser: SignUpInfo = {

If you want multiple named users, create a type for the object:

type SignUpUsers = {
  validUser: SignUpInfo
}

then:

export const signupSecondStepUsers: SignUpUsers = {
  validUser: { ... }
}*/

export const validSignUpSecondStepData:SignUpInfo= {
    firstName: 'Mojgan',
    lastName: 'Ahmadnejad',
    company: 'ABC Company',
    address: '12 George Street',
    address2: 'Unit 5',
    state: 'NSW',
    country: 'India',
    city: 'Sydney',
    zipCode: '2000',
    mobileNumber: '0412345678',
    days: '17',
    months: '8',
    years: '1989',
    password:'123'
  
}
type ExistingUser = {
  name: string
  email: string
}
type ValidUser={
  name:string,
  email?:string
}


export type SignUpFirstStepUsers= {validUser:ValidUser,existingUser:ExistingUser}
export const signUpFirstStepUsers:SignUpFirstStepUsers = {
  validUser: {
    name: 'Mojgan',
  },
  existingUser: {
    name: 'mojgan',
    email: 'mojgan1a@yahoo.com',
  },
}
export type SignUpFirstStepData = {
  name: string
  email: string
}

export function buildSignUpFirstStepData(overrides?: Partial<SignUpFirstStepData>): SignUpFirstStepData {
  return {
    name: signUpFirstStepUsers.validUser.name,
    email: generateEmail('mojgan'),
    ...overrides,
  }
}

export type Category = 'empty' | 'format' | 'business'

export type InvalidSignUpCase = {
  category: Category
  name: string
  data: () => SignUpFirstStepData
  field: 'name' | 'email'
  expectedError: string
}

export const invalidSignUpCases_empty: InvalidSignUpCase[] = [
  {category:'empty', name:'empty name', data:()=>buildSignUpFirstStepData({name:''}), field:'name', expectedError:'fill'},
  {category:'empty', name:'empty email', data:()=>buildSignUpFirstStepData({email:''}), field:'email', expectedError:'fill'},
]

export const invalidSignUpCases_format: InvalidSignUpCase[] = [
  {category:'format', name:'invalid email format', data:()=>buildSignUpFirstStepData({email:'invalidEmailFormat'}), field:'email', expectedError:'@'},
]

export const invalidSignUpCases_business: InvalidSignUpCase[] = [
  {category:'business', name:'already registered email', data:()=>buildSignUpFirstStepData({name:signUpFirstStepUsers.existingUser.name, email:signUpFirstStepUsers.existingUser.email}), field:'email', expectedError:'already exist'},
]

export const invalidSignUpCases: InvalidSignUpCase[] = [
  ...invalidSignUpCases_empty,
  ...invalidSignUpCases_format,
]