'use client';

import React, { use, useCallback, useEffect, useState } from 'react';
import { Repository, SearchOption, User } from '@/app/lib/types';

import GitClient from './lib/api/gitClient';
import Header from '@/app/components/Header';
import Input from '@/app/components/Input';
import { SEARCH_TYPES } from '@/app/lib/constants';
import SearchList from '@/app/components/SearchList';
import Selector from '@/app/components/Selector';
import debounce from '@/app/utils/debounce';

const CHARACTER_SEARCH_LIMIT = 3;
const DEBOUNCE_DELAY = 300;
const searchOptions = [
  { id: 1, name: SEARCH_TYPES.USERS },
  { id: 2, name: SEARCH_TYPES.REPOSITORIES },
];

const Home = () => {
  const [searchType, setSearchType] = useState<SearchOption>(searchOptions[0]);
  const [query, setQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<User[] | Repository[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);

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

  const handleSelectSearchTypeChange = useCallback(
    (selectedOption: SearchOption) => {
      setResults([]);
      setLoading(false);
      setError('');
      setSearchType(selectedOption);
      setInputValue('');
      setQuery('');
      setCurrentPage(1);
      setHasMoreResults(true);
    },
    [],
  );

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
            page: currentPage,
            perPage: 20,
          });
        } else if (searchType.name === SEARCH_TYPES.REPOSITORIES) {
          response = await GitClient.searchByRepoName({
            repoName: query,
            page: currentPage,
            perPage: 20,
          });
        }

        if (response) {
          setResults(prevResults => [...prevResults, ...response.items]);
          setHasMoreResults(!response.incompleteResults);
        } else {
          setError('No results found');
        }
      } catch (err) {
        setError('Error loading data. Please try again');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, searchType, currentPage]);

  const handleOnReachScrollLimit = useCallback(() => {
    if (!loading && hasMoreResults) {
      debounce(
        () => setCurrentPage(prevPage => prevPage + 1),
        DEBOUNCE_DELAY,
      )();
    }
  }, [loading, hasMoreResults]);

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
        {inputValue && (
          <SearchList
            loading={loading}
            error={error}
            searchType={searchType}
            results={results}
            onReachScrollLimit={handleOnReachScrollLimit}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
