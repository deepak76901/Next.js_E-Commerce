"use client"
import { selectLoggedInUser } from "@/Redux/slices/authSlice";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return redirect("/login");
  }
  return children;
}

export default Protected;
