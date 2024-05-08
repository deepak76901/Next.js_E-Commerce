import { User } from "@/models/User.model";
import { connectDB } from "@/utils/connectDB";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const user = await User.findById(params.id);
    return Response.json(user);
  } catch (error) {
    return Response.json({ success: false, message: "fail to fetch user" });
  }
}
