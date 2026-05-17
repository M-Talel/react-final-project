import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import productsData from "./data/products";
import "./styles/App.css";

function App() {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");

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
  }

  return (
    <div>
      <Navbar />

      <Hero />

      <SearchBar search={search} setSearch={setSearch} />

      <ProductForm addProduct={addProduct} />

      <ProductList products={filteredProducts} />

      <Footer />
    </div>
  );
}

export default App;