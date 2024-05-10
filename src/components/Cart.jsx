"use client";

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
  resetCartAsync,
} from "@/Redux/slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { discountedPrice } from "@/utils/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "@/Redux/slices/OrderSlice";
import { selectLoggedInUser } from "@/Redux/slices/authSlice";

function Cart({ selectedAddress, paymentMethod }) {
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  const userOrders = useSelector(selectCurrentOrder);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const handleOrder = () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        userId: user._id,
        items,
        totalItems,
        totalAmount,
        selectedAddress,
        paymentMethod,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Please enter Address and Payment method");
    }
  };

  useEffect(() => {
    if(userOrders){
      router.push(`/order/success/${userOrders._id}`);
    }
  }, [dispatch,userOrders]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mt-6 p-4 bg-white ">
          <h2 className="text-3xl pt-3 pb-5 pl-7 font-semibold bg-white">
            Cart Items
          </h2>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200 px-7">
              {items.map((item) => (
                <li key={item._id} className="flex py-6">
                  <Link
                    href={`/product-detail/${item.product._id}`}
                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                  >
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/product-detail/${item.product._id}`}>
                            {item.product.title}
                          </Link>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <label
                        htmlFor="quantity"
                        className="text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}
                        className="mx-3"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <div className="flex">
                        <button
                          onClick={(e) => handleRemove(e, item._id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-4 bg-white border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6 mx-auto">
              {pathname === "/cart" ? (
                <Link
                  href="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Check Out
                </Link>
              ) : (
                <button
                  onClick={handleOrder}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </button>
              )}
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500 gap-2">
              <p>or</p>
              <Link href="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
