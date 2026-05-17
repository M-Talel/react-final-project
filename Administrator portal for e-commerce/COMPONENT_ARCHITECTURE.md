# Component Architecture Documentation

This document outlines the component tree structure, state management, and prop relationships within the Coffee R Us Admin Portal application.

## Component Tree Diagram

```
App (Root)
│
├── BrowserRouter (React Router)
│   └── StoreProvider (Context Provider)
│       ├── Layout
│       │   ├── Navigation
│       │   └── Routes
│       │       ├── Route path="/"
│       │       │   └── HomePage
│       │       │
│       │       ├── Route path="/products"
│       │       │   └── ProductsPage
│       │       │       └── ProductCard (multiple instances)
│       │       │
│       │       └── Route path="/add-product"
│       │           └── AddProductPage
│       │
│       └── Toaster (Toast notifications)
```

## Component Breakdown

### 1. App Component
- **Location**: `src/app/App.tsx`
- **Type**: Root Component
- **Purpose**: Application entry point, sets up routing and global providers
- **Children**: BrowserRouter → StoreProvider → Layout + Toaster
- **State**: None (stateless)
- **Props**: None

---

### 2. StoreProvider (Context Provider)
- **Location**: `src/context/StoreContext.tsx`
- **Type**: Context Provider
- **Purpose**: Global state management for products and store information
- **State**: 
  - `storeData: StoreData` - Contains store info and products array
- **Provided Methods**:
  - `getProducts(): Promise<Product[]>` - Fetches all products
  - `getProductById(id): Promise<Product | undefined>` - Fetches single product
  - `getStoreInfo(): Promise<StoreInfo>` - Fetches store information
  - `addProduct(product): Promise<Product>` - Adds new product (POST simulation)
  - `updateProduct(id, updates): Promise<Product>` - Updates product (PATCH simulation)
- **Children**: All application components have access to this context

---

### 3. Layout Component
- **Location**: `src/app/components/Layout.tsx`
- **Type**: Structural Component
- **Purpose**: Provides consistent page structure with navigation
- **Props**:
  ```typescript
  interface LayoutProps {
    children: ReactNode;  // Page content to render
  }
  ```
- **Children**: Navigation + Route content
- **State**: None (stateless)

---

### 4. Navigation Component
- **Location**: `src/app/components/Navigation.tsx`
- **Type**: UI Component
- **Purpose**: Application navigation bar
- **State**: None (uses `useLocation` hook)
- **Props**: None
- **Features**:
  - Dynamic active link highlighting
  - Responsive design (collapses labels on mobile)
  - Navigation items: Home, Products, Add Product

---

### 5. HomePage Component
- **Location**: `src/app/components/HomePage.tsx`
- **Type**: Page Component
- **Purpose**: Landing page displaying store info and dashboard stats
- **State**:
  - `storeInfo: StoreInfo | null` - Store information
  - `productCount: number` - Total number of products
  - `loading: boolean` - Loading state
- **Context Usage**: 
  - Uses `useStore()` hook to access `getStoreInfo()` and `getProducts()`
- **Props**: None
- **Child Components**: None
- **Features**:
  - Hero section with store branding
  - Dashboard statistics cards
  - Quick action links
  - About section

---

### 6. ProductsPage Component
- **Location**: `src/app/components/ProductsPage.tsx`
- **Type**: Page Component
- **Purpose**: Displays all products with search functionality
- **Custom Hooks**:
  - `useProducts()` - Fetches products with loading/error states
  - `useProductSearch(products)` - Filters products based on search term
- **State** (via hooks):
  - `products: Product[]` - All products
  - `loading: boolean` - Loading state
  - `error: string | null` - Error message
  - `searchTerm: string` - Current search query
  - `filteredProducts: Product[]` - Filtered results
- **Props**: None
- **Child Components**: 
  - Multiple `ProductCard` instances (one per product)
- **Features**:
  - Real-time search filtering
  - Product count display
  - Empty state handling
  - Responsive grid layout

---

### 7. ProductCard Component
- **Location**: `src/app/components/ProductCard.tsx`
- **Type**: UI Component
- **Purpose**: Displays and edits individual product information
- **Props**:
  ```typescript
  interface ProductCardProps {
    product: Product;      // Product data to display
    onUpdate: () => void;  // Callback after successful update
  }
  ```
- **State**:
  - `isEditing: boolean` - Edit mode toggle
  - `isSaving: boolean` - Save operation in progress
  - `editData: EditFormData` - Form data for editing
- **Refs**:
  - `priceInputRef: RefObject<HTMLInputElement>` - Auto-focus price input
- **Hooks**:
  - `useId()` - Generates unique IDs for form fields
  - `useStore()` - Access to `updateProduct()` method
- **Features**:
  - Inline editing of all product fields
  - Cancel functionality with state revert
  - Optimistic UI updates
  - Toast notifications
  - Input validation

---

### 8. AddProductPage Component
- **Location**: `src/app/components/AddProductPage.tsx`
- **Type**: Page Component
- **Purpose**: Form for adding new products
- **State**:
  - `formData: FormData` - Form input values
  - `isSubmitting: boolean` - Submission in progress
- **Hooks**:
  - `useId()` - Generates unique form field IDs
  - `useStore()` - Access to `addProduct()` method
  - `useNavigate()` - Router navigation
- **Props**: None
- **Features**:
  - Form validation
  - Submit handling with POST simulation
  - Navigation after success
  - Back/Cancel navigation
  - Toast notifications
  - Loading states

---

## Custom Hooks

### 1. useProducts
- **Location**: `src/hooks/useProducts.ts`
- **Purpose**: Manages product fetching with loading and error states
- **Dependencies**: `useStore()` context hook
- **Returns**:
  ```typescript
  {
    products: Product[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }
  ```
- **Usage**: ProductsPage component

---

### 2. useProductSearch
- **Location**: `src/hooks/useProductSearch.ts`
- **Purpose**: Filters products based on search term
- **Input**: `products: Product[]`
- **Returns**:
  ```typescript
  {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredProducts: Product[];
  }
  ```
- **Optimization**: Uses `useMemo` to prevent unnecessary re-filtering
- **Search Fields**: name, description, origin
- **Usage**: ProductsPage component

---

## State Management Strategy

### Global State (Context API)
- **Location**: `StoreContext`
- **Scope**: Entire application
- **Contains**:
  - Store information
  - Products array
  - CRUD operations for products

**Why Context?**
- Single source of truth for product data
- Avoids prop drilling
- Simulates backend API with consistent interface
- Easy to swap with real API calls

### Local State (useState)
- **Scope**: Individual components
- **Examples**:
  - Form inputs (`AddProductPage`, `ProductCard`)
  - UI toggles (edit mode in `ProductCard`)
  - Loading indicators
  - Error messages

### Derived State (useMemo)
- **Used in**: `useProductSearch` hook
- **Purpose**: Compute filtered products without unnecessary recalculations
- **Dependencies**: products array, search term

---

## Data Flow Patterns

### 1. Product Fetching Flow
```
ProductsPage
  → useProducts hook
    → useStore context
      → getProducts() method
        → Returns Promise<Product[]>
          → Updates local state
            → Renders ProductCard components
```

### 2. Product Creation Flow
```
AddProductPage
  → User fills form
    → Form submission
      → useStore context
        → addProduct() method
          → Updates global state
            → useNavigate to /products
              → ProductsPage refetches data
```

### 3. Product Update Flow
```
ProductCard
  → User clicks edit
    → Edit mode enabled
      → User modifies fields
        → Save button clicked
          → useStore context
            → updateProduct() method
              → Updates global state
                → onUpdate callback
                  → Parent refetches data
                    → Re-renders with new data
```

### 4. Search Flow
```
ProductsPage
  → useProducts hook fetches all products
    → useProductSearch hook receives products
      → User types in search input
        → setSearchTerm updates state
          → useMemo recomputes filtered results
            → Renders filtered ProductCard components
```

---

## Prop Drilling Prevention

The application uses Context API to prevent prop drilling:

### Without Context (Would require):
```
App → Layout → ProductsPage → ProductCard
                ↓             ↓
           products prop  onUpdate prop
```

### With Context (Current):
```
App (StoreProvider wraps all)
  ↓
Any component can use useStore() hook
```

---

## React Hooks Usage Summary

| Hook | Usage | Location |
|------|-------|----------|
| `useState` | Local state management | All form components, edit modes |
| `useEffect` | Data fetching on mount | HomePage, useProducts hook |
| `useContext` | Access global store | All components needing data |
| `useId` | Unique form field IDs | AddProductPage, ProductCard |
| `useRef` | Input focus management | ProductCard (price input) |
| `useMemo` | Search optimization | useProductSearch hook |
| `useNavigate` | Programmatic navigation | AddProductPage |
| `useLocation` | Active route detection | Navigation component |

---

## Component Communication Patterns

### 1. Parent-to-Child (Props)
```typescript
<ProductCard 
  product={productData}     // Data down
  onUpdate={handleRefetch}  // Callbacks up
/>
```

### 2. Child-to-Parent (Callbacks)
```typescript
// Parent provides callback
const handleUpdate = () => {
  refetch(); // Refetch data after update
};

// Child calls it after operation
<ProductCard onUpdate={handleUpdate} />
```

### 3. Sibling-to-Sibling (Context)
```typescript
// AddProductPage adds product
addProduct(newProduct);

// ProductsPage automatically sees update
// because both use same context
```

---

## Routing Structure

```
Route: /
├── Component: HomePage
├── Features: Store info, stats, quick links
└── Navigation: Links to /products, /add-product

Route: /products
├── Component: ProductsPage
├── Features: Product listing, search, edit
└── Navigation: Links to /, /add-product

Route: /add-product
├── Component: AddProductPage
├── Features: Add new product form
└── Navigation: Back button, cancel to /products
```

---

## Testing Strategy

### Component Tests
- Each page component has dedicated test file
- Tests cover:
  - Initial render states
  - Loading states
  - User interactions
  - Form submissions
  - Navigation flows
  - Search functionality

### Test Files
```
__tests__/
├── HomePage.test.tsx        # 5 tests
├── ProductsPage.test.tsx    # 6 tests
├── ProductCard.test.tsx     # 5 tests
└── AddProductPage.test.tsx  # 5 tests
```

### Test Coverage
- **21 tests total** - All passing ✅
- UI rendering
- User interactions (clicks, typing)
- Async data fetching
- Form validation
- Navigation
- Search filtering

---

## Performance Considerations

### 1. Memoization
- `useProductSearch` uses `useMemo` to avoid re-filtering on every render
- Only recalculates when products or searchTerm changes

### 2. Lazy Loading
- Components only load when routes are accessed
- React Router handles code splitting

### 3. Optimistic Updates
- UI updates immediately while API call is in progress
- Provides better user experience

### 4. Debouncing
- Search filtering happens on every keystroke
- Future enhancement: Add debouncing for large datasets

---

## Accessibility Features

1. **Semantic HTML**: Proper use of headings, forms, labels
2. **Form Labels**: All inputs have associated labels with `htmlFor`
3. **Unique IDs**: `useId()` hook ensures no ID collisions
4. **ARIA Labels**: Buttons have descriptive labels
5. **Keyboard Navigation**: All interactive elements are keyboard accessible
6. **Focus Management**: `useRef` to focus inputs when entering edit mode

---

## Future Architecture Improvements

1. **Error Boundaries**: Add React error boundaries for graceful error handling
2. **Code Splitting**: Implement React.lazy for route-based code splitting
3. **Virtual Scrolling**: For large product lists
4. **Debounced Search**: Optimize search for better performance
5. **Optimistic UI**: Already implemented, could be enhanced
6. **Redux/Zustand**: Consider for more complex state management needs
7. **React Query**: For advanced caching and synchronization
8. **Form Libraries**: Consider React Hook Form for complex validation

---

This architecture provides a solid foundation for a scalable, maintainable admin portal with clear separation of concerns and predictable data flow.
