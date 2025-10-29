// get all prodcuts


import dbConnect from "@/lib/dbconnect";
import ProductsModel from "@/model/products";
import { NextRequest, NextResponse } from "next/server";
import { Checkadmin } from "@/lib/auth";

export async function GET(_request: NextRequest) {
        try {
            await dbConnect()

           const FoundProducts = await ProductsModel.find({})

           return  NextResponse.json({
            message: "Success",
            FoundProducts
           } , {status: 200})


        } catch (error) {
            console.log("Error while fetching all the products" , error)
            return NextResponse.json({
                message: "Error while fetching the all the products"
            } , {status: 500})
        }

}



// add a new Product

export async function POST( request: NextRequest) {
    try {

        const authError = Checkadmin(request)
        if(authError) return authError;


        await dbConnect()

        const formdata = await request.formData()

        const name = formdata.get("name") as string || null
        const description = formdata.get("description") as string || null
        const price = formdata.get("price") as string || null;
        const category = formdata.get("category") as string || null;
       const inventory = formdata.get("inventory") as string || null;

       if (!name || !description || !price || !category || !inventory) {
        return NextResponse.json({
            message: "Error all fields are required!"
        } , {status: 404})
       }


  const slug = name?.toLowerCase().replace(/\s+/g, "-");
  
       const newProduct = new ProductsModel({
        name,
        slug,
        description,
        price,
        category,
        inventory
       })
     await newProduct.save()

     
     return NextResponse.json({
        message: "Sucuessfully added new product",
        newProduct
     } , {status: 200})
        


    } catch (error) {
        console.log("Error while adding a new Product"  , error)  
        return NextResponse.json({
            message: "Error while adding a new Project"
        } , {status: 500})
    }
}