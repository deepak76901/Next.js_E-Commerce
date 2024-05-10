"use client";

import Protected from "@/components/auth/Protected";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <Protected>
        <Navbar />
        <Checkout />
        <Footer />
      </Protected>
    </div>
  );
}
