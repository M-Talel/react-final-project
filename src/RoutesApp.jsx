import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

import { useState, useMemo } from "react";
import productsData from "./data/products";

export default function RoutesApp() {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");

  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products]
  );

  function addProduct(newProduct) {
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: prev.length + 1,
      },
    ]);
  }

  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
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


