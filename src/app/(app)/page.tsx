import Link from 'next/link'
import ProductList from './components/ProductList'
import dbConnect from '@/lib/dbconnect';
import ProductsModel from '@/model/products';

// Needs SSG (data must fetched on build time) 
// static site generation
// with data 

async function HomePage() {

  await dbConnect();
  const products = await ProductsModel.find({}).lean();


  return (
   <main className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ Product Catalog</h1>

        {/* Simple Nav Links */}
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            href="/admin"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Admin Panel
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Dashboard
          </Link>

           <Link
            href="/recommendations"
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            recommendations
          </Link>
        </nav>
      </header>

      {/* Product List */}
      <section>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">No products available yet.</p>
        ) : (
          <ProductList products={products} />
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Product Store – Static Site Demo (SSG)</p>
      </footer>
    </main> 
  )
}

export default HomePage
