import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function EditProductPage({ products, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const editingProduct = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [products, id]
  );

  if (!editingProduct) {
    return (
      <section className="products-page">
        <div className="page-header">
          <div>
            <p className="eyebrow">Not Found</p>
            <h1>Product does not exist</h1>
          </div>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </section>
    );
  }

  return (
    <section className="product-form-page">
      <ProductForm
        addProduct={() => {}}
        editingProduct={editingProduct}
        onUpdate={(payload) => {
          onUpdate(payload);
          navigate("/products");
        }}
        onCancel={() => navigate("/products")}
      />
    </section>
  );
}

export default EditProductPage;


