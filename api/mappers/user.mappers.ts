import { SignUpInfo } from "../../data/signUp.data";
import { CreateUserPayload } from "../types/userApi.types";

export function mapSignUpToCreateUserPayLoad(email:string,name:string,user:SignUpInfo):CreateUserPayload{
return {
            email,
            password :user.password,
            name,
            firstname: user.firstName,
            lastname:user.lastName,
            address1:user.address,
            country :user.country,
            state:user.state,
            city:user.city,
            zipcode:user.zipCode,
            mobile_number:user.mobileNumber
}
    
}