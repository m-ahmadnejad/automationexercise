export type CreateUserPayload={
            email:string,
            password :string,
            name:string,
            firstname: string,
            lastname:string,
            address1:string,
            country :string,
            state:string,
            city:string,
            zipcode:string,
            mobile_number:string
}

export type CreateUserResult={
    body:{
        responseCode :number,
        message : string
    },
    status:number,
    user:CreateUserPayload
}


