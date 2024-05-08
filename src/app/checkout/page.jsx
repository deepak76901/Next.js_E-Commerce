"use client"

import Protected from "@/components/auth/Protected";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <Protected>
        <Checkout  />
      </Protected>
    </div>
  );
}
