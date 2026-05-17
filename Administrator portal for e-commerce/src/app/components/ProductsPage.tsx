import { useProducts } from '../../hooks/useProducts';
import { useProductSearch } from '../../hooks/useProductSearch';
import { ProductCard } from './ProductCard';
import { Search, Package } from 'lucide-react';

export function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();
  const { searchTerm, setSearchTerm, filteredProducts } = useProductSearch(products);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm ? 'No products found' : 'No products available'}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Add your first product to get started'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} product
            {products.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onUpdate={refetch} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
