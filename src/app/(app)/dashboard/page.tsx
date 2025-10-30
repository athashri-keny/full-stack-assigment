import Link from "next/link";


async function page() {

const res = await fetch(`${process.env.BASE_URL}/api/products` , {
  cache: "no-store"
})

const data = await res.json()
const products = data.FoundProducts || []
const totalProducts = products.length;





  return (
   <main className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">📦 Inventory Dashboard</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border rounded-lg p-6 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalProducts}</p>
        </div>


        <div className="bg-white border rounded-lg p-6 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-800">In Stock</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
           {totalProducts}
          </p>
        </div>
      </section>

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Product Inventory
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <li
                key={p._id}
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {p.name}
                </h3>

                <p className="text-gray-600 text-sm mb-1">
                  Category: <span className="font-medium">{p.category}</span>
                </p>

                <p
                  className={`text-sm font-medium ${
                    p.inventory < 5 ? "text-red-500" : "text-green-600"
                  }`}
                >

                  Stock: {p.inventory}
                </p>
                <p className="text-sm text-gray-700">Price: ₹{p.price}</p>
              </li>
            ))}
          </ul>
        )}
      </section>


      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Product Dashboard – Real-time SSR Data</p>
      </footer>
    </main>
  )
}

export default page
