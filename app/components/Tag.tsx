import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

import Link from 'next/link';
import React from 'react';

interface TagProps {
  text: string;
  options: { label: string; href: string }[];
  onClick?: () => void;
  disabled?: boolean;
}

function Tag({ text, options, onClick, disabled }: TagProps) {
  return (
    <Menu as="div" className="relative text-left">
      <MenuButton
        onClick={onClick}
        className={
          'cursor-pointer rounded border border-accent bg-accent px-2 py-1 text-small transition-colors duration-200 hover:bg-secondary data-[disabled]:cursor-not-allowed data-[disabled]:bg-disabled data-[open]:bg-secondary'
        }
        disabled={disabled}
      >
        {text}
      </MenuButton>
      {options.length > 0 && (
        <Transition
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <MenuItems className="absolute mt-2 w-56 origin-top-right rounded border border-border bg-primary shadow-lg">
            {options.map((option, index) => (
              <MenuItem key={index} as="div">
                {({ close }) => (
                  <Link
                    target="_blank"
                    onClick={close}
                    href={option.href}
                    className="block px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-secondary data-[active]:bg-accent"
                  >
                    {option.label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      )}
    </Menu>
  );
}

export default Tag;
