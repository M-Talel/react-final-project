import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <main className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          stock={product.stock}
          image={product.image}
        />
      ))}
    </main>
  );
}

export default ProductList;