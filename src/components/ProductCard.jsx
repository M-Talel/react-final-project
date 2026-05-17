function ProductCard({
  name,
  price,
  category,
  stock,
  image
}) {
  return (
    <article className="product-card">
      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p>Category: {category}</p>

      <p>${price}</p>

      <small>Stock: {stock}</small>
    </article>
  );
}

export default ProductCard;