'use client'

import  { useState } from 'react'

function wishlistbutton({product}: {product: any}) {
const [added , setadded] = useState(false)

function handleWishList() {
    setadded(true)
    alert("Added to wish list" )
    console.log("added to wish list" , product.name)
}

  return (
    <div>
      <button
      onClick={handleWishList}
      disabled={added}
      className={`px-3 py-2 rounded ${
        added ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
      } text-white`}
    >
      {added ? "Added " : "Add to Wishlist"}
    </button>
    </div>
  )
}

export default wishlistbutton
