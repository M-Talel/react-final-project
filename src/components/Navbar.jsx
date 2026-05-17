import { useState } from "react";

function Navbar({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false);

  function handleNavigate(page) {
    setOpen(false);
    onNavigate(page);
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-mark">U</span>
        <div>
          <p className="brand-caption">UrbanWear</p>
          <h1>Admin Portal</h1>
        </div>
      </div>

      <button
        className={`hamburger-button ${open ? "open" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((s) => !s)}
      >
        <span />
        <span />
        <span />
      </button>

      {/*
        The navigation list is collapsed on small screens; `open` toggles
        visibility. We keep the toggle state local to Navbar so the rest of
        the app doesn't need to know about menu visibility.
      */}
      <ul className={`navbar-list ${open ? "" : "collapsed"}`}>
        <li
          className={activePage === "home" ? "active" : ""}
          onClick={() => handleNavigate("home")}
        >
          Home
        </li>
        <li
          className={activePage === "products" ? "active" : ""}
          onClick={() => handleNavigate("products")}
        >
          Products
        </li>
        <li
          className={activePage === "add" ? "active" : ""}
          onClick={() => handleNavigate("add")}
        >
          Add Product
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
