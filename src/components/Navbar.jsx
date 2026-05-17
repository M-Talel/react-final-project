function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <h1>UrbanWear Admin</h1>

      <ul>
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