
import { Checkadmin } from "@/lib/auth";
import dbConnect from "@/lib/dbconnect";
import ProductsModel from "@/model/products";
import { NextRequest, NextResponse } from "next/server";



// edit the product

export async function PUT( request: NextRequest  , {params}: {params: Promise <{id: string}>}) {
    
    try {
        
                const authError = Checkadmin(request)
                if(authError) return authError;

        await dbConnect()
        const ProductID = (await params).id
        if(!ProductID) {
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

         const UpdatedData = await request.json();
         console.log(UpdatedData)

         const UpdatedProduct = await ProductsModel.findByIdAndUpdate(
            ProductID,
          UpdatedData,
          {new: true, runValidators: true} 
         )
    
    
         
    if (!UpdatedProduct)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );

       return NextResponse.json(
      {
        message: "✅ Product updated successfully",
      },
      { status: 200 }
    );



    } catch (error) {
        console.log("Error while Editing the  products details try again later" , error)
        return NextResponse.json({
            message: "Error while editing the product details"
        } , {status: 500})
    }
} 