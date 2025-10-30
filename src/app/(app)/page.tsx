import ProductList from './components/ProductList'
// Needs SSG (data must fetched on build time) 
// static site generation
// with data 

async function HomePage() {


const res = await fetch(`${process.env.BASE_URL}/api/products` , {
  cache: 'force-cache'
})
const data = await res.json()
const products = data.FoundProducts   

// GET

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
     <ProductList products={products}/>
    </main>
  )
}

export default HomePage
