import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products]
  );

  const lowStockCount = useMemo(
    () => products.filter((product) => product.stock <= 5).length,
    [products]
  );

  function addProduct(newProduct) {
    setProducts([
      ...products,
      {
        ...newProduct,
        id: products.length + 1,
      },
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
    <div className="app-shell">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="page-frame">
        {activePage === "home" && (
          <section className="home-page">
            <Hero
              productCount={products.length}
              categoryCount={categoryCount}
              lowStockCount={lowStockCount}
            />

            <div className="dashboard-grid">
              <article className="dashboard-card">
                <h2>Built for fashion inventory</h2>
                <p>
                  UrbanWear Admin keeps your catalog clean, your inventory
                  visible, and your product workflow fast.
                </p>
              </article>

              <article className="dashboard-card">
                <p className="card-label">Featured category</p>
                <strong>Hoodies & Streetwear</strong>
                <p>
                  Showcase your best-selling clothing categories and launch new
                  styles easily.
                </p>
              </article>

              <article className="dashboard-card">
                <p className="card-label">Quick actions</p>
                <button className="primary-button" type="button" onClick={startAddProduct}>
                  Add new product
                </button>
              </article>
            </div>
          </section>
        )}

        {activePage === "products" && (
          <section className="products-page">
            <div className="page-header">
              <div>
                <p className="eyebrow">Inventory</p>
                <h1>All Products</h1>
              </div>
              <button className="primary-button" type="button" onClick={startAddProduct}>
                Add Product
              </button>
            </div>
            <SearchBar search={search} setSearch={setSearch} />
            <ProductList
              products={filteredProducts}
              onEdit={(product) => {
                setEditingProduct(product);
                setActivePage("add");
              }}
            />
          </section>
        )}

        {activePage === "add" && (
          <section className="product-form-page">
            <ProductForm
              addProduct={addProduct}
              editingProduct={editingProduct}
              onUpdate={updateProduct}
              onCancel={() => {
                setEditingProduct(null);
                setActivePage("products");
              }}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
