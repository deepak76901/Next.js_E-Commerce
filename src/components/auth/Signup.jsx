"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, createUserAsync } from "@/Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();

  const signup = (data) => {
    dispatch(
      createUserAsync({
        username: data.username,
        email: data.email,
        password: data.password,
        addresses: [],
      })
    );
  };

  return (
    <>
      {user?.email}
      {user && router.push("/login")}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto "
            src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png"
            alt="Your Company"
            width={100}
            height={24}
          />
          <h2 className="mt-4 text-center text-lg sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-4"
            onSubmit={handleSubmit(signup)}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name:
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username", {
                    required: "username is required",
                  })}
                  type="string"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs sm:text-sm sm:leading-6 px-3"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Not a valid email address",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs  sm:text-sm sm:leading-6 px-3"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `
                      - at least 8 characters\n
-must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
-Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs  sm:text-sm sm:leading-6 px-3"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "please confirm password",
                    validate: (value, formValues) =>
                      value === formValues.password || "password doesn't match",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-xs  sm:text-sm sm:leading-6 px-3"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a User?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
