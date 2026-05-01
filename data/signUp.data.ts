
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
export type SignUpValidationData={email:string,name:string,expectedMessage:string}
export type SignUpValidationCase ={name:string,data:SignUpValidationData,field:'email' | 'name'}

export const signUpValidationCases :SignUpValidationCase []=[{name:'invalid Email Address format',data:{email:'invalidEmailFormat',name:'Mojgan',expectedMessage:'@'},field:'email'},
                       {name:'empty email',data:{email:'',name:'Mojgan',expectedMessage:'please fill'},field:'email'},
                       {name:'empty user with valid email',data:{email:'Mojgan11a@yahoo.com',name:'',expectedMessage:'please fill'},field:'name'}
]