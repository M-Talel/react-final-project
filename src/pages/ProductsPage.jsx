import { useMemo } from "react";
import SearchBar from "../components/Searchbar";
import ProductList from "../components/ProductList";

import { useNavigate } from "react-router-dom";

function ProductsPage({ products, search, setSearch }) {
  const navigate = useNavigate();

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  return (
    <section className="products-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>All Products</h1>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => navigate("/add")}
        >
          Add Product
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <ProductList
        products={filteredProducts}
        onEdit={(product) => navigate(`/products/${product.id}/edit`)}
      />
    </section>
  );
}

export default ProductsPage;


