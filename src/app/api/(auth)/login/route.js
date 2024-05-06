import { User } from "@/models/User.model";
import { connectDB } from "@/utils/connectDB";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await connectDB();
  try {
    const { email, password } = await request.json();
    console.log("Password",password,email)

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    console.log("Valid Password", validPassword);

    if (!validPassword) {
      return Response.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error -- : ", error);
  }
}
