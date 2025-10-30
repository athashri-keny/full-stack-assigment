import { NextRequest , NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import ProductsModel from "@/model/products";

export async function GET( request: NextRequest , {params}: {params: Promise<{slug: string}>}) {
    try {
        await dbConnect()

        const slug = (await params).slug

        const foundSLug = await ProductsModel.findOne({slug})
        if (!foundSLug) {
            return NextResponse.json({
                message: "Error slug requird!"
            } , {status: 401})
        }

        return NextResponse.json({
            message: "FOund",
            foundSLug
        })

    } catch (error) {
        console.log("Error while getting slug", error)
        return NextResponse.json({
            message: "Error while  getting the slug"
        } , {status: 500})
    }

}