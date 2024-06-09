import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { useEffect, useState } from 'react';
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
      <div className="relative">
        <ListboxButton className="w-56 rounded border border-foreground bg-primary p-2 text-left text-foreground transition-colors duration-200 hover:bg-secondary">
          {`${placeholder} ${selectedOption.name}`}
        </ListboxButton>
        <Transition
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
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
