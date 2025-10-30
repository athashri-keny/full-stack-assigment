"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";
import Link from "next/link";

// ✅ Product Schema
export const ProductCreate = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be greater than 0"), // coerce fixes the number issue
  description: z.string().min(1, "Description is required"),
  category: z.string("catergory is required!"),
  inventory: z.number("Inventory feild is required!")
});

export type Product = z.infer<typeof ProductCreate>;

function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [editing, setEditing] = useState (null as any); 

  
  useEffect(() => {
    setAdminKey(localStorage.getItem("adminKey") || "");
    load();
  }, []);


  async function load() {
    const res = await fetch(`/api/products`, { cache: "no-store" });
    const data = await res.json();
    setProducts(data.FoundProducts || []);
  }

  // ✅ Create Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },

  } = useForm<Product>({
    resolver: zodResolver(ProductCreate),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      inventory: 0
    },
  });

  async function onCreate(values: Product) {
    console.log("Creating product", values);

    
const formdata = new FormData()

formdata.append("name" , values.name);
formdata.append("price" , values.price.toString())
formdata.append("description" , values.description)
formdata.append("category" , values.category)
formdata.append("inventory" , values.inventory.toString())


    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "x-admin-key": adminKey,
      },
      body: formdata,
    });


    if (!res.ok) return alert(" Create failed check admin key");
    reset();
    await load();
     alert("Product creted sucessfully")
  }


  const {
    register: editReg,
    handleSubmit: handleEdit,
    reset: resetEdit,
    formState: { errors: editErr, isSubmitting: editSubmitting },
  } = useForm<Product>({
    resolver: zodResolver(ProductCreate),
  });


  async function onUpdate(values: Product) {
    if (!editing) return;

    const res = await fetch(`/api/products/${editing._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) return alert(" Update failed");
    setEditing(null);
    await load();
        alert("Product Updated sucessfully")
  }


  function openEdit(p: Product) {
    setEditing(p);
    resetEdit(p);
  }



  return (
<main className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800">🛠️ Admin Panel</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Admin Key */}
      <section className="bg-white p-6 rounded-lg shadow-sm border mb-10 max-w-xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Admin Access</h2>
        <label className="block text-sm text-gray-600 mb-1">Admin Key</label>
        <input
          className="border p-2 rounded w-full text-black"
          value={adminKey}
          onChange={(e) => {
            setAdminKey(e.target.value);
            localStorage.setItem("adminKey", e.target.value);
          }}
          placeholder="Enter ADMIN_KEY"
        />
      </section>

      {/* Create Product */}
      <section className="bg-white p-6 rounded-lg shadow-sm border mb-10 max-w-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Product</h2>

        <form onSubmit={handleSubmit(onCreate)} className="grid gap-3">
          <input className="border p-2 rounded text-black" placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          <input
            className="border p-2 rounded text-black"
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}

          <input
            className="border p-2 rounded text-black"
            placeholder="Category"
            {...register("category")}
          />

          <textarea
            className="border p-2 rounded text-black"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}

          <input
            className="border p-2 rounded text-black"
            type="number"
            placeholder="Inventory"
            {...register("inventory", { valueAsNumber: true })}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isSubmitting ? "Saving..." : "Create Product"}
          </button>
        </form>
      </section>

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <li
              key={p._id}
              className="border bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-sm text-gray-600">₹{p.price}</p>
                </div>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openEdit(p)}
                >
                  Edit
                </button>
              </div>

              {editing?._id === p._id && (
                <form onSubmit={handleEdit(onUpdate)} className="mt-3 grid gap-2">
                  <input className="border p-2 rounded text-black" {...editReg("name")} />

                  <input
                    className="border p-2 rounded text-black"
                    type="number"
                    {...editReg("price", { valueAsNumber: true })}
                  />
                  <input
                    className="border p-2 rounded text-black"
                    type="number"
                    {...editReg("inventory", { valueAsNumber: true })}
                  />
                  <input className="border p-2 rounded text-black" {...editReg("category")} />
                  <input className="border p-2 rounded text-black" {...editReg("description")} />

                  <div className="flex gap-2 mt-2">
                    <button
                      disabled={editSubmitting}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      {editSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="px-3 py-1 bg-red-700 rounded hover:bg-red-900"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Admin Panel – Product Management</p>
      </footer>
    </main>
  );
}

export default AdminPage;
