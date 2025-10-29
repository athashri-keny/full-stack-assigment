"use client"


import React, { useEffect, useState } from 'react'
import axios from 'axios'

// SSR needed


function page() {

const [products , setproducts] = useState([])

useEffect(() => {
 const fetchProducts = async() => {      
try {
   const response = await axios.get('/api/products')

   if (products.length === 0) {
    console.log("No products uploaded yett")
   }
   console.log(response.data)
   setproducts(response.data.products)

} catch (error) {
    console.log("Error while  Fetching  the produts" , error)
}
    }
fetchProducts()
} , [])


  return (
<div>
    dashboard
</div>
  )
}

export default page
