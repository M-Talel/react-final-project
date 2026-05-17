import { useState, useRef, useId } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Edit2, Save, X, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onUpdate: () => void;
}

export function ProductCard({ product, onUpdate }: ProductCardProps) {
  const { updateProduct } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  const [editData, setEditData] = useState({
    name: product.name,
    description: product.description,
    origin: product.origin,
    price: product.price.toString(),
  });

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      priceInputRef.current?.focus();
    }, 0);
  };

  const handleCancel = () => {
    setEditData({
      name: product.name,
      description: product.description,
      origin: product.origin,
      price: product.price.toString(),
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    const price = parseFloat(editData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setIsSaving(true);
    try {
      await updateProduct(product.id, {
        name: editData.name,
        description: editData.description,
        origin: editData.origin,
        price: price,
      });

      toast.success('Product updated successfully!');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update product');
      console.error('Error updating product:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        {isEditing ? (
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
            className="text-xl font-bold text-gray-800 border-b-2 border-amber-600 focus:outline-none w-full"
          />
        ) : (
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        )}
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-amber-700 hover:text-amber-900 p-1"
            aria-label="Edit product"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {isEditing ? (
          <textarea
            id={`${formId}-description`}
            name="description"
            value={editData.description}
            onChange={handleChange}
            rows={2}
            className="text-gray-600 w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          />
        ) : (
          <p className="text-gray-600">{product.description}</p>
        )}

        <div className="flex items-center space-x-2 text-gray-500">
          <MapPin className="h-4 w-4" />
          {isEditing ? (
            <input
              id={`${formId}-origin`}
              type="text"
              name="origin"
              value={editData.origin}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none focus:border-amber-600"
            />
          ) : (
            <span>{product.origin}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">$</span>
              <input
                id={`${formId}-price`}
                ref={priceInputRef}
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
          ) : (
            <span className="text-2xl font-bold text-amber-700">
              ${product.price.toFixed(2)}
            </span>
          )}

          {isEditing && (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex items-center space-x-1"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
