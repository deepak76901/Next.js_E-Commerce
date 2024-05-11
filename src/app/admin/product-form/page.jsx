import ProductForm from '@/components/admin\'s/ProductForm'
import Protected from '@/components/auth/Protected'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function page() {
  return (
    <Protected>
      <Navbar/>
      <ProductForm/>
      <Footer/>
    </Protected>
  )
}
