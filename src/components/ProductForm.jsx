import { useEffect, useState } from "react";


function ProductForm({ addProduct, editingProduct, onUpdate, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const isEditMode = Boolean(editingProduct);

  useEffect(() => {
    if (!isEditMode) return;

    setName(editingProduct.name ?? "");
    setPrice(String(editingProduct.price ?? ""));
    setCategory(editingProduct.category ?? "");
    setStock(String(editingProduct.stock ?? ""));
    setImage(editingProduct.image ?? "");
  }, [isEditMode, editingProduct]);


  function handleSubmit(e) {
    e.preventDefault();

    const productPayload = {
      name,
      price: Number(price),
      category,
      stock: Number(stock),
      image
    };

    if (isEditMode) {
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
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? "Edit Product" : "Add Product"}</h2>


      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <div className="product-form-actions">
        {isEditMode && (
          <button
            type="button"
            className="secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit">{isEditMode ? "Save Changes" : "Add Product"}</button>
      </div>

    </form>
  );
}

export default ProductForm;