export type AuthPayload={

    email:string,password:string
}

export type AuthResult={
    body:{
        responseCode :number,
        message : string
    },
    status:number,
    user:AuthPayload

}