import { Locator ,expect} from "playwright/test";


export  function generateEmail(prefix:string):string {
            return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}@test.com`
} 
export async function expectNativeFieldValidation(input: Locator, expectedMessage: string) {
              const messeage = await input.evaluate((el) => (el as HTMLInputElement).validationMessage);
              const isValid= await input.evaluate((e1)=>(e1 as HTMLInputElement).checkValidity())
              expect(messeage.toLowerCase()).toContain(expectedMessage.toLowerCase())
              expect(isValid).toBe(false)
}
