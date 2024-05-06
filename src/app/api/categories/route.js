import { Category } from "@/models/category.model";
import { connectDB } from "@/utils/connectDB";

export async function GET(request){
    await connectDB();

    try {
        const categories = await Category.find({})
        return Response.json({
            categories
        })
    } catch (error) {
        return Response.json({
            success:false,
            message:error
        })
    }
}