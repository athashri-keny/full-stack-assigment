import {z} from 'zod'

export const ProductCreate = z.object({
    name: z.string("Name is required!"),
    price: z.coerce.number("should me a number") , 
    description: z.string("description is required"),
    category: z.string().optional(),
    inventory: z.number("Inventory feild is required!")
})
3

export type Product = z.infer<typeof ProductCreate>;