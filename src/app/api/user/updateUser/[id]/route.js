import { User } from "@/models/User.model";
import { connectDB } from "@/utils/connectDB";

export async function PATCH(request, { params }) {
  await connectDB();

  const address = await request.json();
  try {
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        $push: {
          addresses: address,
        },
      },
      { new: true }
    );

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ success: false, message: "fail to update user" });
  }
}
