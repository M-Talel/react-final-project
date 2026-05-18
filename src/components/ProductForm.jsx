import { useEffect, useState } from "react";

function ProductForm({ addProduct, editingProduct, onUpdate, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const isEditMode = Boolean(editingProduct);

  // eslint/react-hooks warning fix: defer setState to next tick.
  useEffect(() => {
    if (!isEditMode) return;

    const t = setTimeout(() => {
      setName(editingProduct.name ?? "");
      setPrice(String(editingProduct.price ?? ""));
      setCategory(editingProduct.category ?? "");
      setStock(String(editingProduct.stock ?? ""));
      setImage(editingProduct.image ?? "");
    }, 0);

    return () => clearTimeout(t);
  }, [isEditMode, editingProduct]);


  function handleSubmit(e) {
    e.preventDefault();

    const productPayload = {
      name,
      price: Number(price),
      category,
      stock: Number(stock),
      image,
    };

    if (isEditMode) {
      // Merge changes into the existing product object and send to parent.
      onUpdate({ ...editingProduct, ...productPayload });
      return;
    }

    addProduct(productPayload);

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage("");
  }

  return (
    <form className="product-form card" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">Product Manager</p>
          <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
        </div>
      </div>

      <label>
        Product name
        <input
          type="text"
          placeholder="Oversized Hoodie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Price (Ksh)
        <input
          type="number"
          placeholder="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
      </label>

      <label>
        Category
        <input
          type="text"
          placeholder="Hoodies"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>

      <label>
        Stock quantity
        <input
          type="number"
          placeholder="12"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          required
        />
      </label>

      <label>
        Image URL
        <input
          type="url"
          placeholder="https://images.unsplash.com/..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>

      <div className="product-form-actions">
        {isEditMode && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary-button">
          {isEditMode ? "Save Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
