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
- IDs are generated client-side and may collide if you implement persistence.
- No authentication or backend integration.
- Currency formatting uses `Number.prototype.toFixed`; for production use `Intl.NumberFormat`.

## Notes on Development

- To change the default product images, edit `src/data/products.jsx` and provide valid image URLs or local assets under `src/assets/`.
- The navbar is fixed using `--navbar-height`; if you add new top bars, update the CSS variable accordingly.

## Pushing to GitHub

If you want me to push this repository to GitHub, I can attempt to create a public repo and push it for you. This requires the GitHub CLI (`gh`) to be installed and authenticated in this environment. If `gh` is not available, here are the commands to run locally to create a public repo and push:

```bash
# create a repo on GitHub and push local code
git remote remove origin || true
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

Or with `gh` (simpler):

```bash
gh repo create REPO_NAME --public --source=. --remote=origin --push
```

Replace `YOUR_USERNAME` and `REPO_NAME` with your values.

If you'd like, I can try to run the `gh` command from this environment and push; tell me to proceed and confirm you want the repository created under your GitHub account.
