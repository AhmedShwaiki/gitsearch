import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

export interface Option {
    id: number;
    name: string;
    unavailable?: boolean;
}

interface SelectorProps {
    options: Option[];
    selected: Option;
    onSelect: (option: Option) => void;
}

function Selector({ options, selected, onSelect }: SelectorProps) {
    const [selectedOption, setSelectedOption] = useState<Option>(selected);

    useEffect(() => {
        setSelectedOption(selected);
    }, [selected]);

    const handleChange = (option: Option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <Listbox value={selectedOption} onChange={handleChange}>
            <div className="relative">
                <ListboxButton className="p-2 border border-foreground rounded text-left w-56 bg-primary text-foreground hover:bg-secondary transition-colors duration-200">
                    {`Search by ${selectedOption.name}`}
                </ListboxButton>
                <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <ListboxOptions className="mt-1 border border-foreground rounded shadow-lg w-56 bg-primary backdrop-blur-lg">
                        {options.map((option) => (
                            <ListboxOption
                                key={option.id}
                                value={option}
                                disabled={option.unavailable}
                                className="group flex items-center gap-2 py-2 pl-4 pr-4 cursor-pointer select-none rounded data-[focus]:bg-secondary data-[selected]:bg-accent text-foreground transition-colors duration-200"
                            >
                                <span className="block truncate">{option.name}</span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Transition>
            </div>
        </Listbox>
    );
}

export default Selector;
