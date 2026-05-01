//🧠 What is Data-Driven Testing?🔥 Simple definition : 👉 Instead of writing many similar tests 👉 you write one test 👉 and run it with different data

//🧠 Why do we use it? 1. Remove duplication 2. Easier to maintain 3. Better coverage 4. Cleaner code

//type of data driven testing : 🧠 1. Static Data-Driven (Basic) : Hardcoded data inside test file 
//🧠 When to use  ✔ simple validation  ✔ few test cases ✔ fast writing
//⚠️ Downside not reusable file gets messy if large

//🧠 2. External Data-Driven (Data File) ✅ What it is Move test data to separate file
//همون بالایی فقط میره تو یه فایل دیگه
//🧠 When to use : ✔ many test cases ✔ reuse across tests ✔ cleaner test files

//🧠 3. Dynamic Data-Driven (Function-based)  What it is Data depends on runtime (like user from fixture)
//4. table dirven testing : it includes input and expected result
//and all other types


export type Credential={email:string,password:string}
export type ValidationCredentials=Credential &{message:string}

export type loginValidationCase={name:string,data:ValidationCredentials,field:'email' | 'password'}

export const loginvalidationCases  :loginValidationCase[]= 
                               [{name:'invalid email format and valid password',data:{email:'Mojgano.com',password:'123',message:'@'},field:'email'},
                                {name:'empty email and valid password',data:{email:'',password:'123',message:'Please fill out this field'},field:'email'},
                                {name:'valid email and empty password',data:{email:'mojgan1a@yahoo.com',password:'',message:'Please fill out this field'},field:'password'}]

export type loginCredentialCase={name:string,data:Credential}
export const invalidCredentialCases   :loginCredentialCase[]= [{name:'unregistered email and valid password',data:{email:'mojgan11a@yahoo.com',password:'123'}},
                                {name:'valid email and inValid password',data:{email:'mojgan1a@yahoo.com',password:'0000'}}
]




type VerifyLoginCase = { name: string ,data: (user: { email: string; password: string }) => { email: string, password: string }
}
export const verifyLoginCases: VerifyLoginCase[] = [
  {
    name: 'should fail login with empty email',
    data: (user) => ({
      email: '',
      password: user.password,
    }),
  },
  {
    name: 'should fail login with invalid credentials',
    data: (_user) => ({
      email: 'wrong email',
      password: 'Invalid Password',
    }),
  },
]