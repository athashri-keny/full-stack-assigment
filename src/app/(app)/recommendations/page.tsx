
import WishlistButton from '../components/wishlist-button'


 async function page() {
    
const res = await fetch(`${process.env.BASE_URL}/api/products` , {
  cache: "no-cache"
})

const data = await res.json()
const products = data.FoundProducts.slice(0 , 5)

  return (
     <main className="min-h-screen bg-gray-50 px-6 py-10 space-y-8">
      {/* Page Title */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800">
          🌟 Recommended Products
        </h1>
        <p className="text-gray-600 mt-1">
          Curated picks based on popular items and new arrivals.
        </p>
      </header>

      {/* Product List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <li
            key={p._id}
            className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="space-y-2">
              <h2 className="font-semibold text-lg text-gray-800">{p.name}</h2>
              <p className="text-gray-600 text-sm">{p.description}</p>
              <p className="text-green-600 font-medium text-sm">₹{p.price}</p>
            </div>

            {/* Client component for wishlist */}
            <div className="mt-4">
              <WishlistButton product={p} />
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="pt-10 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Product Recommender — All rights reserved.</p>
      </footer>
    </main>
  )
}

export default page
