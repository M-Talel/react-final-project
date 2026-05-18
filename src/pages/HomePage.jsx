import Hero from "../components/Hero";

import { useNavigate } from "react-router-dom";

function HomePage({ productCount, categoryCount }) {
  const navigate = useNavigate();

  return (
    <section className="home-page">
      <Hero productCount={productCount} categoryCount={categoryCount} />

      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Built for fashion inventory</h2>
          <p>
            UrbanWear Admin keeps your catalog clean, your inventory visible, and
            your product workflow fast.
          </p>
        </article>

        <article className="dashboard-card">
          <p className="card-label">Featured category</p>
          <strong>Hoodies & Streetwear</strong>
          <p>
            Showcase your best-selling clothing categories and launch new styles
            easily.
          </p>
        </article>

        <article className="dashboard-card">
          <p className="card-label">Quick actions</p>
          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/add")}
          >
            Add new product
          </button>
        </article>
      </div>
    </section>
  );
}

export default HomePage;


