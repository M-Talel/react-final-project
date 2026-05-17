function Hero({ productCount, categoryCount, lowStockCount }) {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Admin Dashboard</p>
        <h2>Manage your clothing catalog with confidence.</h2>
        <p>
          UrbanWear Admin helps you keep product details, stock levels, and
          styling categories in one polished dashboard.
        </p>
      </div>

      <div className="hero-stats">
        <div>
          <p>Products</p>
          <strong>{productCount}</strong>
        </div>
        <div>
          <p>Categories</p>
          <strong>{categoryCount}</strong>
        </div>
        <div>
          <p>Low stock</p>
          <strong>{lowStockCount}</strong>
        </div>
      </div>
    </section>
  );
}

export default Hero;
