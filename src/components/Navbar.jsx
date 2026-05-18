import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  function handleNavClick() {
    setOpen(false);
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

      <ul className={`navbar-list ${open ? "" : "collapsed"}`}>
        <li>
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active-home" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active-products" : "nav-link"
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive ? "nav-link active-add" : "nav-link"
            }
          >
            Add Product
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;

