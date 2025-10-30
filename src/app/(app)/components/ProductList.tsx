'use client'

import Link from 'next/link';
import { useState } from 'react'


function ProductList({products}: {products: any[]}) {
const [search , setsearch] = useState("")


const filtered = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);


  return (
   <>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="border p-2 rounded-md mb-4 w-full max-w-sm"
      />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <li key={p._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="font-semibold">{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-green-600 font-medium">${p.price}</p>
            <Link href={`/products/${p.slug}`} className="text-blue-500 underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProductList

