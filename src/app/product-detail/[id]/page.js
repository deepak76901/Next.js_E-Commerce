"use client"
import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import ProductDetails from '@/components/products/ProductDetails';
import { useDispatch } from 'react-redux';
import { fetchProductByIdAsync } from '@/Redux/slices/ProductSlice';

export default function page({id}) {
    
  return (
    <div>
      {/* <ProductDetails id={id} /> */}
    </div>
  )
}
