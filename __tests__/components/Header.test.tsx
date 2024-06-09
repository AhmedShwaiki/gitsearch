import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Header from '@/app/components/Header';
import React from 'react';

describe('Header Component', () => {
  it('should render the logo image', () => {
    render(<Header />);
    const logoImage = screen.getByAltText('GitSearch Logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('should render the heading with text "GitSearch"', () => {
    render(<Header />);
    const headingElement = screen.getByText('GitSearch');
    expect(headingElement).toBeInTheDocument();
  });
});
