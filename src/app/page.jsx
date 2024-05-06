"use client";

import Protected from "@/components/auth/Protected";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/products/ProductList";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    
      <Protected>
        <Navbar/>
        <ProductList />
        <Footer/>
      </Protected>
    
  );
}
