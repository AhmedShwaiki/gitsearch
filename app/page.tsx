'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Repository, User } from '@/app/lib/types';
import Selector, { Option } from '@/app/components/Selector';

import GitClient from './lib/api/gitClient';
import Header from '@/app/components/Header';
import Input from '@/app/components/Input';
import RepoCard from '@/app/components/RepoCard';
import { SEARCH_TYPES } from '@/app/lib/constants';
import UserCard from '@/app/components/UserCard';
import debounce from '@/app/utils/debounce';

const CHARACTER_SEARCH_LIMIT = 3;
const DEBOUNCE_DELAY = 300;
const searchOptions = [
  { id: 1, name: SEARCH_TYPES.USERS },
  { id: 2, name: SEARCH_TYPES.REPOSITORIES },
];

const Home = () => {
  const [searchType, setSearchType] = useState<Option>(searchOptions[0]);
  const [query, setQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<User[] | Repository[]>([]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setLoading(false);
      setError('');

      // TODO: implement more validation on the raw string
      setInputValue(newValue);

      const trimmedValue = newValue.trim();
      if (trimmedValue.length >= CHARACTER_SEARCH_LIMIT) {
        debounce(() => setQuery(trimmedValue), DEBOUNCE_DELAY)();
      }
    },
    [],
  );

  const handleSelectSearchTypeChange = useCallback((selectedOption: Option) => {
    setResults([]);
    setLoading(false);
    setError('');
    setSearchType(selectedOption);
    setInputValue('');
    setQuery('');
  }, []);

  useEffect(() => {
    if (query.length < CHARACTER_SEARCH_LIMIT) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        let response;
        if (searchType.name === SEARCH_TYPES.USERS) {
          response = await GitClient.searchByUsername({
            username: query,
            page: 1,
          });
        } else if (searchType.name === SEARCH_TYPES.REPOSITORIES) {
          response = await GitClient.searchByRepoName({
            repoName: query,
            page: 1,
          });
        } else {
          setError('Invalid search type');
        }

        if (response) {
          console.log(response);

          setResults(response.items);
          // TODO: implement pagination
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, searchType]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-background-start to-background-end p-8 text-foreground">
      <div className="w-full max-w-5xl">
        <Header />
        <div className="mb-8 flex w-full max-w-5xl justify-around space-x-5">
          <div className="w-2/3">
            <Input
              value={inputValue}
              placeholder={`Enter ${CHARACTER_SEARCH_LIMIT} or more characters`}
              onChange={handleInputChange}
            />
          </div>
          <div className="z-10">
            <Selector
              placeholder={'Search by'}
              options={searchOptions}
              selected={searchType}
              onSelect={handleSelectSearchTypeChange}
            />
          </div>
        </div>

        <div className="flex h-[720px] flex-col space-y-6 overflow-x-hidden overflow-y-scroll px-6 py-2">
          {searchType.name === SEARCH_TYPES.USERS &&
            (results as User[]).map(user => (
              <UserCard key={user.id} data={user} />
            ))}
          {searchType.name === SEARCH_TYPES.REPOSITORIES &&
            (results as Repository[]).map(repo => (
              <RepoCard key={repo.id} data={repo} />
            ))}
        </div>

        {error && <div className="text-red-500">{error}</div>}
        {loading && <div className="text-red-500">Loading...</div>}
      </div>
    </div>
  );
};

export default Home;
