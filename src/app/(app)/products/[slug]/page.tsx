import Link from 'next/link';
import { notFound } from 'next/navigation';
// ISR
// get a single product slug and return them 
export const revalidate = 60;

export default async function ProductDetailPage(props: {params: Promise<{slug: string}>} ) {
  
const {slug} = await props.params
const res = await fetch(`${process.env.BASE_URL}/api/products/by-slug/${slug}`  , {
  next: {revalidate: 60}
})

if(!res.ok) {
  notFound()
}

const data = await res.json()
const product = data.foundSLug
console.log("Found Products = " , product)


  return (
     <main className="p-10">
      <Link href="/" className="text-blue-500 underline block mb-6">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl text-green-600 mb-2">${product.price}</p>
      <p className="text-sm text-gray-500">
        Category: {product.category} | Stock: {product.inventory}
      </p>
    </main>
  )
}

// get all slugs and prebuild them in build time so render fast
export async function generateStaticParams() {
  
  const res = await fetch(`${process.env.BASE_URL}/api/products` , {
    cache: "force-cache"
  })

  const data = await res.json()
  console.log(data)

  return data.FoundProducts.map((p: any) => ({
    slug: p.slug
  }))


}