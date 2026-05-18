import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function AddProductPage({ addProduct }) {
  const navigate = useNavigate();

  return (
    <section className="product-form-page">
      <ProductForm
        addProduct={(payload) => {
          addProduct(payload);
          navigate("/products");
        }}
        editingProduct={null}
        onUpdate={() => {}}
        onCancel={() => navigate("/products")}
      />
    </section>
  );
}

export default AddProductPage;


