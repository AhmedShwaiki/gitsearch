import { Input as HeadlessInput } from '@headlessui/react';

interface InputProps {
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder = "Search Github", disabled = false, autoFocus = false, onChange }: InputProps) {
    return (
        <HeadlessInput
            type="text"
            name="search_query"
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            className={`border border-foreground bg-primary text-foreground p-2 rounded w-full 
        transition-colors duration-200 ease-in-out
        ${disabled ? 'bg-disabled cursor-not-allowed' : 'hover:bg-secondary focus:bg-secondary'}`}
        />
    );
};

export default Input;
