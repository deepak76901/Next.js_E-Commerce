import {User} from "@/models/User.model";
import { connectDB } from "@/utils/connectDB";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await connectDB(); 
  const { username, email, password } =await request.json();
  try {

    const user = await User.findOne({ email });
    if (user) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = bcryptjs.hashSync(password);
    const newUser = new User({ username, email, password: hashedPassword });
     try {
      await newUser.save();
     } catch (error) {
      return Response.json(
        { success: false, message: error.message },
        {
          status: 400,
        }
      );
     }

    return Response.json(
      { success: true, message: "User created Successfully", user: newUser },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      {
        status: 400,
      }
    );
  }
}
