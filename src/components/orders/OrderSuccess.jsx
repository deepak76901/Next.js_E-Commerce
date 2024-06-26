"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "@/Redux/slices/CartSlice";
import { selectLoggedInUser } from "@/Redux/slices/authSlice";
import { resetOrder } from "@/Redux/slices/OrderSlice";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderSuccess() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
      dispatch(resetCartAsync(user._id));
      dispatch(resetOrder());
  }, [dispatch,user]);

  return (
    <>
      {!params.id && router.replace("/")}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Id #{params.id}
          </h1>
          <p className="mt-6 leading-7 text-lg font-semibold  text-gray-600">
            Your Order Placed Successfully
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
