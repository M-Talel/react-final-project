import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AddProductPage } from '../AddProductPage';
import { StoreProvider } from '../../../context/StoreContext';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AddProductPage', () => {
  const renderAddProductPage = () => {
    return render(
      <BrowserRouter>
        <StoreProvider>
          <AddProductPage />
        </StoreProvider>
      </BrowserRouter>
    );
  };

  it('renders the form with all fields', () => {
    renderAddProductPage();

    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  });

  it('allows filling out the form', async () => {
    const user = userEvent.setup();
    renderAddProductPage();

    const nameInput = screen.getByLabelText(/product name/i);
    const descInput = screen.getByLabelText(/description/i);
    const originInput = screen.getByLabelText(/origin/i);
    const priceInput = screen.getByLabelText(/price/i);

    await user.type(nameInput, 'New Coffee');
    await user.type(descInput, 'Delicious coffee');
    await user.type(originInput, 'Colombia');
    await user.type(priceInput, '12.5');

    expect(screen.getByDisplayValue('New Coffee')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Delicious coffee')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Colombia')).toBeInTheDocument();
    expect(priceInput).toHaveValue(12.5);
  });

  it('submits the form with valid data', async () => {
    const user = userEvent.setup();
    renderAddProductPage();

    await user.type(screen.getByLabelText(/product name/i), 'New Coffee');
    await user.type(screen.getByLabelText(/description/i), 'Delicious coffee');
    await user.type(screen.getByLabelText(/origin/i), 'Colombia');
    await user.type(screen.getByLabelText(/price/i), '12.50');

    const submitButton = screen.getByRole('button', { name: /add product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/products');
    });
  });

  it('navigates back when back button is clicked', async () => {
    const user = userEvent.setup();
    renderAddProductPage();

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('navigates to products when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderAddProductPage();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});
