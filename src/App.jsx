import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

import { createProduct, fetchProducts, updateProductById } from "./data/productsApi";

import "./App.css";

const initialProducts = [];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const data = await fetchProducts();
        if (!isCancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        // Keep UI working even if server is down.
        console.error("Failed to load products:", e);
        if (!isCancelled) setProducts([]);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, []);


  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products]
  );

  async function addProduct(newProduct) {
    // json-server will auto-assign id (since db.json has products with ids)
    // but we still read back the created product returned by the server.
    const created = await createProduct(newProduct);
    setProducts((prev) => [...prev, created]);
  }

  async function updateProduct(updatedProduct) {
    const saved = await updateProductById(updatedProduct.id, {
      name: updatedProduct.name,
      price: updatedProduct.price,
      category: updatedProduct.category,
      stock: updatedProduct.stock,
      image: updatedProduct.image,
    });

    setProducts((prev) =>
      prev.map((product) =>
        product.id === saved.id ? saved : product
      )
    );
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-frame">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  productCount={products.length}
                  categoryCount={categoryCount}
                />
              }
            />

            <Route
              path="/products"
              element={
                <ProductsPage
                  products={products}
                  search={search}
                  setSearch={setSearch}
                />
              }
            />

            <Route path="/add" element={<AddProductPage addProduct={addProduct} />} />

            <Route
              path="/products/:id/edit"
              element={<EditProductPage products={products} onUpdate={updateProduct} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

