import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ProductsPage } from '../ProductsPage';
import { StoreProvider } from '../../../context/StoreContext';

describe('ProductsPage', () => {
  const renderProductsPage = () => {
    return render(
      <BrowserRouter>
        <StoreProvider>
          <ProductsPage />
        </StoreProvider>
      </BrowserRouter>
    );
  };

  it('renders loading state initially', () => {
    renderProductsPage();
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
    });

    expect(screen.getByText('House Blend')).toBeInTheDocument();
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
  });

  it('displays product count', async () => {
    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText(/Showing 5 of 5 products/i)).toBeInTheDocument();
    });
  });

  it('filters products based on search term', async () => {
    const user = userEvent.setup();
    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search products/i);
    await user.type(searchInput, 'Ethiopian');

    await waitFor(() => {
      expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
      expect(screen.queryByText('Vanilla Bean')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Showing 1 of 5 products/i)).toBeInTheDocument();
  });

  it('shows no results message when search returns empty', async () => {
    const user = userEvent.setup();
    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search products/i);
    await user.type(searchInput, 'NonexistentProduct');

    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    expect(screen.getByText('Try adjusting your search terms')).toBeInTheDocument();
  });

  it('clears search when input is cleared', async () => {
    const user = userEvent.setup();
    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search products/i);
    await user.type(searchInput, 'Ethiopian');

    await waitFor(() => {
      expect(screen.queryByText('Vanilla Bean')).not.toBeInTheDocument();
    });

    await user.clear(searchInput);

    await waitFor(() => {
      expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
      expect(screen.getByText('House Blend')).toBeInTheDocument();
    });
  });
});
