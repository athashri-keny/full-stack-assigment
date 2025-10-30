import dbConnect from '@/lib/dbconnect';
import ProductsModel from '@/model/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// ISR
// get a single product slug and return them  
export const revalidate = 60;

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {

   await dbConnect();

   const {slug} = await props.params
  const product = await ProductsModel.findOne({slug}).lean();
  console.log(product)
  if (!product) notFound();



  return (
     <main className="min-h-screen bg-gray-50 p-10 space-y-6">
      {/* Back Link */}
      <Link href="/" className="text-blue-600 underline text-sm font-medium">
        ← Back to Home
      </Link>

      {/* Product Info */}
      <section className="bg-white rounded-lg shadow-sm p-6 border max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-green-600 font-semibold text-xl mb-2 sm:mb-0">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500">
            Category: <span className="font-medium">{product.category || "Uncategorized"}</span>
          </p>
        </div>

        <div className="mt-3">
          <p
            className={`text-sm font-medium ${
              product.inventory > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.inventory > 0
              ? `In Stock: ${product.inventory}`
              : "Out of Stock"}
          </p>
        </div>
      </section>
    </main>
  )
}

// get all slugs and prebuild them in build time so render fast
export async function generateStaticParams() {
  await dbConnect()
 
  const docs = await ProductsModel.find({} , "slug").lean()

  return docs.map((d: any) => ({ slug: d.slug }));


}