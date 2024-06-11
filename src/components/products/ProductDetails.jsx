"use client";

import { selectLoggedInUser } from "@/Redux/slices/authSlice";
import { addToCartAsync, selectItems } from "@/Redux/slices/CartSlice";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "@/Redux/slices/ProductSlice";
import { discountedPrice } from "@/utils/constants";
import { ChevronLeft, ChevronRight, Loader2, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Suggestions from "./Suggestions";
import Carousel from "../Carousel";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const product = useSelector(selectProductById);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const params = useParams();
  const { _id } = useSelector(selectLoggedInUser);
  const [index, setIndex] = useState(0);

  const handleCart = (e) => {
    e.preventDefault();

    if (items.length > 0) {
      if (items.findIndex((item) => item.product.id === product.id) < 0) {
        const newItem = {
          quantity: 1,
          user: _id,
          product: product._id,
        };
        dispatch(addToCartAsync(newItem));
      } else {
        alert("Item Already Exist");
      }
    } else {
      const newItem = {
        quantity: 1,
        user: _id,
        product: product._id,
      };
      dispatch(addToCartAsync(newItem));
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [ dispatch,params.id]);
 

  return (
    <div className="bg-white">
      {!product && (
        <div className="min-h-screen flex justify-center items-center">
          <Loader2 size={50} className="animate-spin text-indigo-600"/>
        </div>
      )}
      {product && (
        <div>
          <div className="pt-4  flex flex-col md:flex-row w-full">
            {/* Image gallery */}
            <div className=" mt-4 md:w-[350px] md:h-[450px] mx-10">
              <Carousel images={product.images} />
              <form className="mt-3">
                <button
                  type="submit"
                  onClick={handleCart}
                  className=" flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>
            </div>

            {/* Product info */}
            <div className="md:ml-24 py-3 px-3 scroll-auto overflow-auto">
              <div className="px-5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
                <p className="text-3xl tracking-tight text-gray-900">
                  ${discountedPrice(product)}
                </p>
                <p className="text-xl text-gray-500 line-through">
                  ${product.price}
                </p>
                {/* Reviews */}
                <div className="flex items-center mt-2 bg-[#4d8c1d] text-white h-7 w-16 rounded-md px-1">
                  <span>{product.rating}</span>

                  <Star size={17} strokeWidth={3} className="ml-1" />
                </div>
              </div>

              <div className="italic font-medium px-5 pt-2">
                Category : {product.category}<br/>
                Brand    : {product.brand}
              </div>

              {/**Details */}

              <div className="py-10 px-3 lg:col-span-2">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6 max-w-xl">
                    <p className="text-sm md:text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10 max-w-xl">
                  <h3 className="text-base font-medium text-gray-900">
                    Highlights
                  </h3>
                  <p className="text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Neque nobis minus natus accusantium tempora amet aperiam
                    dolores iure. Reprehenderit perferendis accusamus
                    consectetur eum tempore. Tempora.
                  </p>
                </div>

                <div className="mt-10  max-w-xl ">
                  <h2 className="text-base font-medium text-gray-900">
                    Details
                  </h2>
                  <p className="text-sm md:text-base">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Laborum vel soluta et quidem, explicabo maxime quis nobis
                    illum iste quia recusandae reiciendis asperiores magni ullam
                    ducimus nemo ab non nam minima odio qui?
                  </p>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div><Suggestions category={product.category} /></div>
        </div>
      )}
    </div>
  );
}
