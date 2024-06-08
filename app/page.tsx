"use client"

import React, { useCallback, useState } from 'react';
import Selector, { Option } from '@/app/ui/Selector';
import Header from '@/app/ui/Header';
import Input from '@/app/ui/Input';
import RepoCard from './ui/RepoCard';
import UserCard from '@/app/ui/UserCard';
import debounce from '@/app/lib/debounce';

const options = [
  { id: 1, name: 'Repositories', unavailable: false },
  { id: 2, name: 'Users', unavailable: false },
];

function generateMockRepoData(count: number) {
  const mockRepoData = [];

  for (let i = 1; i <= count; i++) {
    mockRepoData.push({
      id: i,
      name: `Repo ${i}`,
      owner: {
        login: `user${i}`,
        avatar_url: "https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
        html_url: `https://github.com/user${i}`,
      },
      html_url: `https://github.com/user${i}/repo${i}`,
      description: `Description for repo ${i}`,
      language: "JavaScript",
      stargazers_count: Math.floor(Math.random() * 100),
      forks_count: Math.floor(Math.random() * 100),
      open_issues_count: Math.floor(Math.random() * 100),
    });
  }

  return mockRepoData;
}

const mockRepoData = generateMockRepoData(100);

const generateMockUserData = (count: number) => {
  const mockUserData = [];
  for (let i = 1; i <= count; i++) {
    mockUserData.push({
      id: i,
      name: `user${i}`,
      avatar: "https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
      profile: `https://github.com/user${i}`,
    });
  }
  return mockUserData;
};

const mockUserData = generateMockUserData(100);

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
        <div className="flex justify-around w-full max-w-5xl mb-8 space-x-5">
          <div className="w-2/3">
            <Input placeholder='Search Github' onChange={handleInputChange} />
          </div>
          <div className="z-10">
            <Selector placeholder={'Search by'} options={options} selected={searchType} onSelect={setSearchType} />
          </div>
        </div>
        <div className="flex flex-col space-y-6 h-[720px] overflow-y-scroll py-2 px-6 overflow-x-hidden">
          {searchType.name === 'Repositories' ? (
            mockRepoData.map(repo => (
              <RepoCard key={repo.id} data={repo} />
            ))
          ) : (
            mockUserData.map(user => (
              <UserCard key={user.id} data={user} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
