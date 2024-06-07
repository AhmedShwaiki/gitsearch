"use client"

import React, { useCallback, useState } from 'react';
import Selector, { Option } from '@/app/ui/Selector';

import Header from '@/app/ui/Header';
import Input from '@/app/ui/Input';
import debounce from '@/app/lib/debounce'

const options = [
  { id: 1, name: 'Repositories', unavailable: false },
  { id: 2, name: 'Users', unavailable: false },
];

const fakeData = {
  users: [
    { id: 1, name: 'User One', avatar: 'https://via.placeholder.com/50', profile: '#' },
    { id: 2, name: 'User Two', avatar: 'https://via.placeholder.com/50', profile: '#' },
    { id: 3, name: 'User Three', avatar: 'https://via.placeholder.com/50', profile: '#' },
  ],
  repositories: [
    { id: 1, name: 'Repo One', filetypes: ['JavaScript', 'Python'], forks: [{ id: 1, avatar: 'https://via.placeholder.com/30', profile: '#' }] },
    { id: 2, name: 'Repo Two', filetypes: ['HTML', 'CSS'], forks: [{ id: 2, avatar: 'https://via.placeholder.com/30', profile: '#' }] },
    { id: 3, name: 'Repo Three', filetypes: ['Java', 'Go'], forks: [{ id: 3, avatar: 'https://via.placeholder.com/30', profile: '#' }] },
  ]
};

const Home = () => {
  const [searchType, setSearchType] = useState<Option>(options[0]);
  const [query, setQuery] = useState('');

  const handleDebouncedChange = debounce((value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || trimmedValue.length < 3) {
      return;
    }

    setQuery(trimmedValue);
    console.log('Searching for:', trimmedValue);
    // Your API call logic here
  }, 300)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleDebouncedChange(event.target.value);
  }, [handleDebouncedChange]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8 bg-gradient-to-b from-background-start to-background-end text-foreground">
      <div className="w-full max-w-5xl">
        <Header />
        <div className="flex w-full max-w-5xl mb-8 space-x-4">
          <div className="w-2/3">
            <Input placeholder='Search Github' onChange={handleInputChange} />
          </div>
          <div className="w-1/3">
            <Selector options={options} selected={searchType} onSelect={setSearchType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
