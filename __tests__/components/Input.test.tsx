import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Input from '@/app/components/Input';

describe('Input Component', () => {
  it('should render the input component with placeholder', () => {
    render(<Input value="" placeholder="Search Github" />);

    const inputElement = screen.getByPlaceholderText('Search Github');
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onChange handler when input value changes', async () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');

    await fireEvent.input(inputElement, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
