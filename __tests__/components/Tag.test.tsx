import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import React from 'react';
import Tag from '@/app/components/Tag';

describe('Tag Component', () => {
  const options = [
    { label: 'Option 1', href: '/option1' },
    { label: 'Option 2', href: '/option2' },
  ];

  it('should render the tag button with text', () => {
    render(<Tag text="Languages 🌐" options={options} />);
    const button = screen.getByText('Languages 🌐');
    expect(button).toBeInTheDocument();
  });

  it('should disable the button when disabled is true', () => {
    render(<Tag text="Languages 🌐" options={options} disabled />);
    const button = screen.getByText('Languages 🌐');
    expect(button).toBeDisabled();
  });
});
