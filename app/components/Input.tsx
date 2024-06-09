import React, { memo, useCallback } from 'react';

import { Input as HeadlessInput } from '@headlessui/react';

interface InputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  value,
  placeholder = 'Search Github',
  disabled,
  autoFocus,
  onChange,
}: InputProps) {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  return (
    <HeadlessInput
      value={value}
      type="text"
      name="search_query"
      autoFocus={autoFocus}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleOnChange}
      className={`w-full rounded border border-foreground bg-primary p-2 text-foreground transition-colors duration-200 ease-in-out ${disabled ? 'cursor-not-allowed bg-disabled' : 'hover:bg-secondary focus:bg-secondary'}`}
    />
  );
}

export default memo(Input);
