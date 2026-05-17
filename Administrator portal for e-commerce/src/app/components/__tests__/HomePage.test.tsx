import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { StoreProvider } from '../../../context/StoreContext';

describe('HomePage', () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <StoreProvider>
          <HomePage />
        </StoreProvider>
      </BrowserRouter>
    );
  };

  it('renders loading state initially', () => {
    renderHomePage();
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders store information after loading', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Coffee R Us')).toBeInTheDocument();
    });

    expect(screen.getByText('The go to store for coffee')).toBeInTheDocument();
    expect(screen.getByText('555-5555')).toBeInTheDocument();
  });

  it('displays product count', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Total Products')).toBeInTheDocument();
    });

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('View all products')).toBeInTheDocument();
    });

    expect(screen.getByText('Add new product')).toBeInTheDocument();
  });

  it('displays admin portal description', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('About the Admin Portal')).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Welcome to the Coffee R Us Administrator Portal/i)
    ).toBeInTheDocument();
  });
});
