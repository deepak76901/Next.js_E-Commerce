import Protected from "@/components/auth/Protected";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/products/ProductList";
import React from "react";

export default function page() {
  return (
    <Protected>
      <Navbar />
      <ProductList />
      <Footer />
    </Protected>
  );
}
