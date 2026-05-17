import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';

export function AddProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useStore();
  const formId = useId();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.origin || !formData.price) {
      toast.error('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setIsSubmitting(true);
    try {
      await addProduct({
        name: formData.name,
        description: formData.description,
        origin: formData.origin,
        price: price,
      });

      toast.success('Product added successfully!');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor={`${formId}-name`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name *
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              placeholder="e.g., Ethiopian Yirgacheffe"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-description`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id={`${formId}-description`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              placeholder="e.g., Light Roast, Fruity notes"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-origin`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Origin *
            </label>
            <input
              id={`${formId}-origin`}
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              placeholder="e.g., Ethiopia"
              required
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-price`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price ($) *
            </label>
            <input
              id={`${formId}-price`}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>{isSubmitting ? 'Adding...' : 'Add Product'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
