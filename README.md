# UrbanWear Admin (React + Vite)

A small React admin UI for managing product listings. This project demonstrates a responsive admin layout, product CRUD flow (client-side), and a simple lightweight design inspired by an admin dashboard.

## Setup

Requirements:

- Node.js 18+ (or compatible)
- npm

Install and run locally:

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build for production:

```bash
npm run build
```

## Features

- Responsive admin layout with a fixed navbar.
- Product list with search, add, and edit flows (client-side only).
- Hamburger menu for small screens.
- Local product data in `src/data/products.jsx` (no backend).

## Project Structure

- `src/App.jsx` — main app shell and routing-like page state.
- `src/components/` — UI components (`Navbar`, `Hero`, `ProductList`, `ProductCard`, `ProductForm`, etc.).
- `src/data/products.jsx` — sample product data used as the data source.
- `src/App.css` — global styles and responsive rules.

## Known Limitations

- Data is stored only in-memory; refreshing the page resets changes.
- No authentication or backend integration.
- Limited formatting.

JSON Server:[CLICK ME!](https://my-products-api-0fkb.onrender.com/products)
