import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { useEffect, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { SearchOption } from '@/app/lib/types';

interface SelectorProps {
  options: SearchOption[];
  selected: SearchOption;
  onSelect: (option: SearchOption) => void;
  placeholder?: string;
}

function Selector({ options, selected, onSelect, placeholder }: SelectorProps) {
  const [selectedOption, setSelectedOption] = useState<SearchOption>(selected);

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  const handleChange = (option: SearchOption) => {
    onSelect(option);
    setSelectedOption(option);
  };

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      <div className="relative w-56">
        <ListboxButton className="inline-flex items-center gap-2 rounded border border-foreground bg-primary p-2 text-left text-foreground transition-colors duration-200 hover:bg-secondary">
          {`${placeholder} ${selectedOption.name}`}
          <ChevronDownIcon className="size-4 fill-foreground" />
        </ListboxButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ListboxOptions className="absolute mt-1 w-56 rounded border border-foreground bg-primary shadow-lg backdrop-blur-lg">
            {options.map(option => (
              <ListboxOption
                key={option.id}
                value={option}
                disabled={option.unavailable}
                className="group flex cursor-pointer select-none items-center gap-2 rounded py-2 pl-4 pr-4 text-foreground transition-colors duration-200 data-[focus]:bg-secondary data-[selected]:bg-accent"
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
