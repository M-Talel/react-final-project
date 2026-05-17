function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-mark">U</span>
        <div>
          <p className="brand-caption">UrbanWear</p>
          <h1>Admin Portal</h1>
        </div>
      </div>

      <ul className="navbar-list">
        <li
          className={activePage === "home" ? "active" : ""}
          onClick={() => onNavigate("home")}
        >
          Home
        </li>
        <li
          className={activePage === "products" ? "active" : ""}
          onClick={() => onNavigate("products")}
        >
          Products
        </li>
        <li
          className={activePage === "add" ? "active" : ""}
          onClick={() => onNavigate("add")}
        >
          Add Product
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
