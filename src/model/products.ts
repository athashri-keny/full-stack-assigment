    import mongoose, { Schema } from "mongoose";


    export interface Products extends Document {
        name: string,
        slug: string,
        description: string,
        price: number,
        category: string,
        inventory: number,
    }


const ProductsSchemma: Schema<Products> = new Schema({
    name: {
        type: String,
        required: [true , "Name is required!"]
    },
    slug: {
        type: String
    },
    description: {
        type: String,
        required: [true , "Description  is required!"]
    },
    price: {
        type: Number,
        required: [true , "Price is requird!"]
    },
    category: {
        type: String,
        required: true
    },

    inventory: {
        type: Number,
        required: [true , "Invertory number is required!"]
    }
}, {timestamps: true})

    const ProductsModel = (mongoose.models.Products as mongoose.Model<Products> || mongoose.model<Products> ("Products" , ProductsSchemma))


    export default ProductsModel