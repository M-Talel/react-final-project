import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { StoreInfo } from '../../types';
import { Coffee, Phone, Package, Plus, ArrowRight } from 'lucide-react';

export function HomePage() {
  const { getStoreInfo, getProducts } = useStore();
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [info, products] = await Promise.all([getStoreInfo(), getProducts()]);
        setStoreInfo(info);
        setProductCount(products.length);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getStoreInfo, getProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-lg shadow-xl p-8 md:p-12 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <Coffee className="h-16 w-16" />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{storeInfo?.name}</h1>
            <p className="text-xl md:text-2xl text-amber-100 mt-2">
              {storeInfo?.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-amber-100 mt-4">
          <Phone className="h-5 w-5" />
          <span className="text-lg">{storeInfo?.phone_number}</span>
        </div>
      </div>

      {/* Admin Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Products</p>
              <p className="text-3xl font-bold text-amber-800 mt-2">{productCount}</p>
            </div>
            <Package className="h-12 w-12 text-amber-600" />
          </div>
          <Link
            to="/products"
            className="mt-4 flex items-center text-amber-700 hover:text-amber-900 font-medium"
          >
            View all products
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Quick Actions</p>
              <p className="text-lg text-gray-700 mt-2">Manage your inventory</p>
            </div>
            <Plus className="h-12 w-12 text-green-600" />
          </div>
          <Link
            to="/add-product"
            className="mt-4 flex items-center text-green-700 hover:text-green-900 font-medium"
          >
            Add new product
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          About the Admin Portal
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to the Coffee R Us Administrator Portal. This portal allows you to
          manage your coffee product inventory with ease. You can view all products,
          add new coffee varieties, update existing product information including
          prices, and search through your catalog to find specific items quickly.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
            <Package className="h-8 w-8 text-amber-700 mb-2" />
            <h3 className="font-semibold text-gray-800">View Products</h3>
            <p className="text-sm text-gray-600 mt-1">
              Browse your complete coffee catalog
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
            <Plus className="h-8 w-8 text-amber-700 mb-2" />
            <h3 className="font-semibold text-gray-800">Add Products</h3>
            <p className="text-sm text-gray-600 mt-1">
              Easily add new coffee varieties
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
            <Coffee className="h-8 w-8 text-amber-700 mb-2" />
            <h3 className="font-semibold text-gray-800">Manage Inventory</h3>
            <p className="text-sm text-gray-600 mt-1">
              Update prices and product details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
