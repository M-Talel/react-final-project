import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, StoreData, StoreInfo } from '../types';
import { initialMockData } from '../data/mockData';

interface StoreContextType {
  storeData: StoreData;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<Product>;
  getProducts: () => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product | undefined>;
  getStoreInfo: () => Promise<StoreInfo>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [storeData, setStoreData] = useState<StoreData>(initialMockData);

  // Simulates GET request to fetch all products
  const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storeData.coffee);
      }, 300);
    });
  };

  // Simulates GET request to fetch product by ID
  const getProductById = async (id: number): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = storeData.coffee.find((p) => p.id === id);
        resolve(product);
      }, 300);
    });
  };

  // Simulates GET request to fetch store info
  const getStoreInfo = async (): Promise<StoreInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storeData.store_info[0]);
      }, 300);
    });
  };

  // Simulates POST request to add a new product
  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...product,
          id: Math.max(...storeData.coffee.map((p) => p.id), 0) + 1,
        };
        setStoreData((prev) => ({
          ...prev,
          coffee: [...prev.coffee, newProduct],
        }));
        resolve(newProduct);
      }, 300);
    });
  };

  // Simulates PATCH request to update a product
  const updateProduct = async (
    id: number,
    updates: Partial<Product>
  ): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = storeData.coffee.findIndex((p) => p.id === id);
        if (productIndex === -1) {
          reject(new Error('Product not found'));
          return;
        }

        const updatedProduct = { ...storeData.coffee[productIndex], ...updates };
        setStoreData((prev) => ({
          ...prev,
          coffee: prev.coffee.map((p) => (p.id === id ? updatedProduct : p)),
        }));
        resolve(updatedProduct);
      }, 300);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        storeData,
        addProduct,
        updateProduct,
        getProducts,
        getProductById,
        getStoreInfo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
