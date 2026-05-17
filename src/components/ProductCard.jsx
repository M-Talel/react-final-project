function ProductCard({ name, price, category, stock, image, onEdit }) {
  return (
    <article className="product-card card">
      <div className="product-card-image">
        <img src={image} alt={name} />
        <span className="product-badge">{category}</span>
      </div>

      <div className="product-card-body">
        <h3>{name}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        <p className="product-stock">{stock} in stock</p>
        <button type="button" className="secondary-button" onClick={onEdit}>
          Edit Product
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
