import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import SearchBar from "./components/Searchbar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import productsData from "./data/products";
import "./App.css";

function App() {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState("home");

  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function addProduct(newProduct) {
    setProducts([
      ...products,
      {
        ...newProduct,
        id: products.length + 1
      }
    ]);
    setActivePage("products");
  }

  function updateProduct(updatedProduct) {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setActivePage("products");
  }

  function startAddProduct() {
    setEditingProduct(null);
    setActivePage("add");
  }

  return (
    <div className="app">
      <Navbar activePage={activePage} onNavigate={setActivePage} />

      {activePage === "home" && (
        <>
          <Hero />
          <section className="home-summary">
            <p>
              Welcome to UrbanWear Admin. Use the navbar to view products,
              search inventory, or add new items.
            </p>
            <div className="summary-cards">
              <div>
                <strong>{products.length}</strong>
                <span>Products in catalog</span>
              </div>

            </div>
          </section>
        </>
      )}

      {activePage === "products" && (
        <>
          <SearchBar search={search} setSearch={setSearch} />
          <ProductList
            products={filteredProducts}
            onEdit={(product) => {
              setEditingProduct(product);
              setActivePage("add");
            }}
          />
        </>
      )}

      {activePage === "add" && (
        <ProductForm
          addProduct={addProduct}
          editingProduct={editingProduct}
          onUpdate={updateProduct}
          onCancel={() => {
            setEditingProduct(null);
            setActivePage("products");
          }}
        />
      )}
    </div>
  );
}

export default App;