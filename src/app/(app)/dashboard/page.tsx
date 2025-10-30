

async function page() {

const res = await fetch(`${process.env.BASE_URL}/api/products` , {
  cache: "no-store"
})

const data = await res.json()
const products = data.FoundProducts || []
const totalProducts = products.length;

const LowStock = products.filter((p: any) =>  p.inventory < 5).length;



  return (
   <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Inventory Dashboard</h1>

      <div className="mb-6">
        <p className="text-lg">🛒 Total Products: {totalProducts}</p>
        <p className="text-lg text-red-500">⚠️ Low Stock: {LowStock}</p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <li key={p._id} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold">{p.name}</h2>
            <p>Stock: {p.inventory}</p>
            <p>Price: ${p.price}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default page
