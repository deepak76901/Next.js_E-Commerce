"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ProductDetails from "@/components/products/ProductDetails";
import { useDispatch } from "react-redux";
import { fetchProductByIdAsync } from "@/Redux/slices/ProductSlice";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Protected from "@/components/auth/Protected";

export default function page() {
  return (
    <Protected>
      <Navbar />
      <ProductDetails />
      <Footer />
    </Protected>
  );
}
