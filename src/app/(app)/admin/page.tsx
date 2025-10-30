"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";

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
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      {/* Admin Key */}
      <section className="space-y-2">
        <label className="text-sm">Admin Key</label>

        <input
          className="border p-2 rounded w-full max-w-md"
          value={adminKey}
          onChange={(e) => {
            setAdminKey(e.target.value);
            localStorage.setItem("adminKey", e.target.value);
          }}
          placeholder="Paste ADMIN_KEY"
        />

      </section>

      {/* Create Product */}
      <section>
        <h2 className="font-medium mb-2">Create product</h2>
        <form onSubmit={handleSubmit(onCreate)} className="grid gap-3 max-w-xl">

          <input className="border p-2" placeholder="Name" {...register("name")} />

          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          <input
            className="border p-2"
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />

          {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}

          <input className="border p-2" placeholder="Category" {...register("category")}  
          
          />

          <textarea className="border p-2" placeholder="Description" {...register("description")} />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

         <input className="border p-2" placeholder="inventory" {...register("inventory" , {valueAsNumber: true})} 
  
         /> 

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isSubmitting ? "Saving..." : "Create"}
          </button>
        </form>
      </section>

      {/* Product List */}
      <section>
        <h2 className="font-medium mb-2">Products</h2>
        <ul className="space-y-3">

          {products.map((p: any) => (
            <li key={p._id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{p.price} · {p.slug}
                  </p>
                </div>
                <button className="text-blue-600" onClick={() => openEdit(p)}>
                  Edit
                </button>
              </div>

              {editing?._id === p._id && (
                <form onSubmit={handleEdit(onUpdate)} className="mt-3 grid gap-2">

                  <input
                   className="border p-2" 
                   {...editReg("name")} 
                   />
                  {editErr.name && <p className="text-red-600 text-sm">{editErr.name.message}</p>}

                  <input
                    className="border p-2"
                    type="number"
                    {...editReg("price", { valueAsNumber: true })}
                  />

                  <input
                    className="border p-2"
                    type="number"
                    {...editReg("inventory", { valueAsNumber: true })}
                  />

                  <input
                    className="border p-2"
                    {...editReg("description",)}
                  />

<input
                    className="border p-2"
                    {...editReg("category",)}
                  />



                  {editErr.price && <p className="text-red-600 text-sm">{editErr.price.message}</p>}

                  <div className="flex gap-2">
                    <button
                      disabled={editSubmitting}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      {editSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="px-3 py-1 bg-red-200 rounded text-black"
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
    </main>
  );
}

export default AdminPage;
