import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { SearchOption } from '@/app/lib/types';
import Selector from '@/app/components/Selector';

const options: SearchOption[] = [
  { id: 1, name: 'Option 1', unavailable: false },
  { id: 2, name: 'Option 2', unavailable: false },
  { id: 3, name: 'Option 3', unavailable: true },
];

const selected: SearchOption = { id: 1, name: 'Option 1', unavailable: false };

const mockOnSelect = jest.fn();

describe('Selector Component', () => {
  it('renders with correct selected option', () => {
    render(
      <Selector
        options={options}
        selected={selected}
        onSelect={mockOnSelect}
        placeholder="Select"
      />,
    );
    expect(screen.getByText('Select Option 1')).toBeInTheDocument();
  });
});
