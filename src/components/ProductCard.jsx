function ProductCard({
  name,
  price,
  category,
  stock,
  image,
  onEdit
}) {
  return (
    <article className="product-card">
      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p>Category: {category}</p>

      <p>${price}</p>

      <small>Stock: {stock}</small>

      <div className="product-card-actions">
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
