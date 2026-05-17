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

    </div>
  );
}

export default App;