import { Product } from "@/models/Product.model"
import { redirect } from "next/navigation"

export async function GET(req,{params}){
    
    const product = await Product.findOne({_id:params.id})
   

    return Response.json(product)

}