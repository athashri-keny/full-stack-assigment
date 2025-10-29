;
import dbConnect from "@/lib/dbconnect";
import ProductsModel from "@/model/products";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest , {params}: {params: Promise<{id: string}>}) {
    try {
        
        const ProductID = (await params).id
        if(ProductID) {
            return NextResponse.json({
                message: "Error prodcut ID required!"
            } , {status: 400})
        }


        await dbConnect()

        const foundSingleProduct = await ProductsModel.findById(ProductID)
        if (!foundSingleProduct) {
            return NextResponse.json({
                message: "Error product not found!"
            } , {status: 401})
        }

        return NextResponse.json({
            messagee: "Success",
            foundSingleProduct
        } , {status: 201})


    } catch (error) {
        console.log("Error while loading the single product" , error) 
        return NextResponse.json({
            message: "Error while  loading  the single product"
        } , {status: 500})
    }

}


// edit the product

export async function PUT( request: NextRequest  , {params}: {params: Promise <{id: string}>}) {
    try {
        const ProductID = (await params).id
        if(ProductID) {
            return NextResponse.json({
                message: "Error Product Id required"
            } , {status: 401})
        }


        
    const foundSingleProduct = await ProductsModel.findById(ProductID) 


        if (!foundSingleProduct) {
            return NextResponse.json({
                message: "Error Product not found!"
            } , {status: 404})
        }

        return NextResponse.json({
            message: "FOund!",
            foundSingleProduct
        } , {status: 200})


    } catch (error) {
        console.log("Error while Editing the  products details try again later" , error)
        return NextResponse.json({
            message: "Error while editing the product details"
        } , {status: 500})
    }
}
