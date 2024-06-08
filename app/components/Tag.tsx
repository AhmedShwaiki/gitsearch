import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import Link from 'next/link';
import React from 'react';

interface TagProps {
    text: string;
    options: { label: string, href: string }[];
}

function Tag({ text, options }: TagProps) {
    return (
        <Menu as="div" className="relative text-left">
            <MenuButton className="bg-accent data-[open]:bg-secondary text-small rounded px-2 py-1 cursor-pointer border border-accent hover:border-foreground transition-colors duration-200">
                {text}
            </MenuButton>
            <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <MenuItems className="absolute mt-2 w-56 origin-top-right bg-primary border border-border rounded shadow-lg">
                    {options.map((option, index) => (
                        <MenuItem key={index} as="div">
                            <Link
                                href={option.href}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-secondary data-[active]:bg-accent transition-colors duration-200"
                            >
                                {option.label}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Transition>
        </Menu >
    );
}

export default Tag;
