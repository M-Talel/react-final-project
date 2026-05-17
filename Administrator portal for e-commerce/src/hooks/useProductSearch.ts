import { useState, useMemo } from 'react';
import { Product } from '../types';

// Custom hook for searching products
export function useProductSearch(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized filtered products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerSearchTerm) ||
        product.description.toLowerCase().includes(lowerSearchTerm) ||
        product.origin.toLowerCase().includes(lowerSearchTerm)
    );
  }, [products, searchTerm]);

  return { searchTerm, setSearchTerm, filteredProducts };
}
