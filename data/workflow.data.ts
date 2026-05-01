import { ProductItem, singleCartItems } from "./checkout.data";
import { multipleCartItems } from "./checkout.data";
export type Workflow = {
    name:string,
    data:ProductItem[]

}
export const cartworkflow:Workflow[]=[{name:'single user',data:singleCartItems},{name:'multiple user',data:multipleCartItems}]