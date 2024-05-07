"use client";

import ProductDetails from "@/components/products/ProductDetails";
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
