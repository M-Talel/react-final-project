# Coffee R Us - E-Commerce Admin Portal

A comprehensive administrator portal for managing an e-commerce coffee shop. Built with React, TypeScript, Tailwind CSS, and React Router.

## Features

- **Landing Page**: Displays store information, statistics, and quick action links
- **Product Management**: View, add, edit, and search products
- **Dynamic Search**: Real-time product filtering by name, description, or origin
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **State Management**: Global state using React Context API
- **Custom Hooks**: Reusable hooks for data fetching and search functionality
- **Form Handling**: Add new products with validation
- **Inline Editing**: Edit product details directly from the product cards
- **Mock API**: Simulated GET, POST, and PATCH requests with loading states
- **Toast Notifications**: User feedback for successful/failed operations
- **Comprehensive Testing**: Unit tests with Vitest and React Testing Library

## Tech Stack

- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **React Router DOM 7.15.1** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── __tests__/          # Component tests
│   │   ├── AddProductPage.tsx  # Add product form
│   │   ├── HomePage.tsx        # Landing page
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Navigation.tsx      # Navigation bar
│   │   ├── ProductCard.tsx     # Product display/edit card
│   │   └── ProductsPage.tsx    # Products listing with search
│   └── App.tsx                 # Main app with routing
├── context/
│   └── StoreContext.tsx        # Global state management
├── data/
│   └── mockData.ts            # Initial product data
├── hooks/
│   ├── useProducts.ts         # Products fetching hook
│   └── useProductSearch.ts    # Search functionality hook
├── test/
│   └── setup.ts               # Test configuration
└── types/
    └── index.ts               # TypeScript interfaces
```

## Component Tree

```
App
├── BrowserRouter
└── StoreProvider (Context)
    └── Layout
        ├── Navigation
        └── Routes
            ├── HomePage
            ├── ProductsPage
            │   └── ProductCard (multiple)
            └── AddProductPage
```

## State and Props Architecture

### Context API (StoreContext)
- **Purpose**: Global state management for products and store information
- **State**: `storeData` containing store info and products
- **Methods**: 
  - `getProducts()` - GET request simulation
  - `getProductById(id)` - GET single product
  - `getStoreInfo()` - GET store information
  - `addProduct(product)` - POST request simulation
  - `updateProduct(id, updates)` - PATCH request simulation

### Custom Hooks

#### useProducts
- **Purpose**: Fetch and manage products list
- **Returns**: `{ products, loading, error, refetch }`
- **Uses**: Context API for data fetching

#### useProductSearch
- **Purpose**: Filter products based on search term
- **Input**: Array of products
- **Returns**: `{ searchTerm, setSearchTerm, filteredProducts }`
- **Implementation**: Uses `useMemo` for performance optimization

### Component Props

#### ProductCard
```typescript
interface ProductCardProps {
  product: Product;      // Product data to display
  onUpdate: () => void;  // Callback after successful update
}
```

#### Layout
```typescript
interface LayoutProps {
  children: ReactNode;  // Page content to wrap
}
```

## Mock Data Structure

```typescript
interface StoreInfo {
  id: number;
  name: string;
  description: string;
  phone_number: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  origin: string;
  price: number;
}

interface StoreData {
  store_info: StoreInfo[];
  coffee: Product[];
}
```

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coffee-admin-portal
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
# The dev server is already running in Figma Make
# If running locally, you would use: pnpm dev
```

4. The application will be available in the preview pane

## Usage

### Viewing Products
1. Click "Products" in the navigation or "View all products" on the home page
2. Use the search bar to filter products by name, description, or origin
3. Products are displayed in a responsive grid

### Adding a Product
1. Click "Add Product" in the navigation or "Add new product" on the home page
2. Fill in all required fields:
   - Product Name
   - Description
   - Origin
   - Price
3. Click "Add Product" to save
4. You'll be redirected to the products page with a success message

### Editing a Product
1. Navigate to the Products page
2. Click the edit icon on any product card
3. Modify any field (name, description, origin, price)
4. Click "Save" to confirm or "Cancel" to discard changes
5. Toast notification confirms successful update

## Testing

### Run Tests
```bash
pnpm test
```

### Run Tests with UI
```bash
pnpm test:ui
```

### Run Tests with Coverage
```bash
pnpm test:coverage
```

### Test Coverage
- **HomePage**: Store info display, loading states, navigation links
- **ProductsPage**: Product listing, search functionality, empty states
- **ProductCard**: Display, editing, saving, canceling changes
- **AddProductPage**: Form validation, submission, navigation

## Key React Hooks Used

- **useState**: Local component state (form data, edit mode, loading states)
- **useEffect**: Data fetching on component mount
- **useContext**: Accessing global store context
- **useId**: Generating unique IDs for form accessibility
- **useRef**: Focusing input fields programmatically
- **useMemo**: Optimizing search filtering performance
- **Custom Hooks**: `useProducts`, `useProductSearch`

## API Simulation

All data operations simulate async API calls with 300ms delay:

- **GET /products**: Fetch all products
- **GET /products/:id**: Fetch single product
- **GET /store-info**: Fetch store information  
- **POST /products**: Add new product
- **PATCH /products/:id**: Update product

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

Responsive features:
- Collapsible navigation labels on mobile
- Grid layouts that adapt (1 column → 2 columns → 3 columns)
- Stack form elements on mobile
- Flexible spacing and typography

## Known Limitations

1. **Data Persistence**: Data is stored in memory and resets on page refresh. In a production environment, this would connect to a real backend API.

2. **Authentication**: No authentication or authorization implemented. This is an admin-only interface without user management.

3. **Validation**: Basic client-side validation only. Production apps should include server-side validation.

4. **Image Upload**: Products don't support images. Future enhancement could add image upload functionality.

5. **Delete Functionality**: Products cannot be deleted. This could be added as a future feature.

6. **Pagination**: All products load at once. Large datasets would benefit from pagination or infinite scroll.

7. **Error Boundaries**: No React error boundaries implemented for graceful error handling.

8. **Accessibility**: While basic accessibility is implemented (labels, semantic HTML), a full accessibility audit would be beneficial.

## Future Enhancements

- Add product images
- Implement delete functionality
- Add pagination or infinite scroll
- Implement backend API integration
- Add user authentication
- Create dashboard analytics
- Add product categories/tags
- Implement sorting options
- Add bulk operations
- Create export functionality (CSV, PDF)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is created for educational purposes.

## Contact

For questions or feedback, please open an issue in the GitHub repository.

---

Built with ❤️ using React and Tailwind CSS
