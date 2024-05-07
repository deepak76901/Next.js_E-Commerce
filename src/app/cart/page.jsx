"use client";

import Protected from "@/components/auth/Protected";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
  return (
    <Protected>
      <Navbar />
      <Cart />
      <Footer />
    </Protected>
  );
}
