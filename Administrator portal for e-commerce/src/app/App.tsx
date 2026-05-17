import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { AddProductPage } from './components/AddProductPage';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" richColors />
      </StoreProvider>
    </BrowserRouter>
  );
}