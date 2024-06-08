import React, { memo, useCallback } from 'react';

import { Input as HeadlessInput } from '@headlessui/react';

interface InputProps {
    value: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, placeholder = "Search Github", disabled = false, autoFocus = false, onChange }: InputProps) {
    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }
    }, [onChange]);

    return (
        <HeadlessInput
            value={value}
            type="text"
            name="search_query"
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleOnChange}
            className={`border border-foreground bg-primary text-foreground p-2 rounded w-full 
        transition-colors duration-200 ease-in-out
        ${disabled ? 'bg-disabled cursor-not-allowed' : 'hover:bg-secondary focus:bg-secondary'}`}
        />
    );
};

export default memo(Input);
