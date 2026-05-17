import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../ProductCard';
import { StoreProvider } from '../../../context/StoreContext';
import { Product } from '../../../types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Coffee',
  description: 'Test Description',
  origin: 'Test Origin',
  price: 10.0,
};

describe('ProductCard', () => {
  const renderProductCard = (product = mockProduct) => {
    const mockOnUpdate = vi.fn();
    return {
      ...render(
        <StoreProvider>
          <ProductCard product={product} onUpdate={mockOnUpdate} />
        </StoreProvider>
      ),
      mockOnUpdate,
    };
  };

  it('renders product information', () => {
    renderProductCard();

    expect(screen.getByText('Test Coffee')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Origin')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('enters edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    renderProductCard();

    const editButton = screen.getByRole('button', { name: /edit product/i });
    await user.click(editButton);

    expect(screen.getByDisplayValue('Test Coffee')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Origin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('allows editing product fields', async () => {
    const user = userEvent.setup();
    renderProductCard();

    const editButton = screen.getByRole('button', { name: /edit product/i });
    await user.click(editButton);

    const priceInput = screen.getByDisplayValue('10');
    await user.clear(priceInput);
    await user.type(priceInput, '15');

    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
  });

  it('cancels editing and reverts changes', async () => {
    const user = userEvent.setup();
    renderProductCard();

    const editButton = screen.getByRole('button', { name: /edit product/i });
    await user.click(editButton);

    const priceInput = screen.getByDisplayValue('10');
    await user.clear(priceInput);
    await user.type(priceInput, '15');

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('saves changes and calls onUpdate', async () => {
    const user = userEvent.setup();
    const { mockOnUpdate } = renderProductCard();

    const editButton = screen.getByRole('button', { name: /edit product/i });
    await user.click(editButton);

    const priceInput = screen.getByDisplayValue('10');
    await user.clear(priceInput);
    await user.type(priceInput, '15');

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });
});
