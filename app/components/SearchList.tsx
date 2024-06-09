import { Repository, User, SearchOption } from '@/app/lib/types';

import Image from 'next/image';
import React from 'react';
import RepoCard from '@/app/components/RepoCard';
import { SEARCH_TYPES } from '@/app/lib/constants';
import UserCard from '@/app/components/UserCard';

interface SearchListProps {
  loading: boolean;
  error: string | null;
  searchType: SearchOption;
  // TODO: make the list type agnostic
  results: User[] | Repository[];
}

function SearchList({ loading, error, searchType, results }: SearchListProps) {
  return (
    <div
      className={
        'flex h-[660px] flex-col space-y-6 overflow-x-hidden px-6 py-2'
      }
    >
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded border border-border bg-gradient-to-r from-primary to-secondary p-4 shadow-sm shadow-border duration-200"
          >
            <div className="mb-2 h-6 w-24 bg-accent"></div>
            <div className="mb-2 h-4 w-24 bg-accent"></div>
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-8 w-8 rounded-full bg-accent"></div>
              <div className="h-4 w-24 bg-accent"></div>
            </div>
          </div>
        ))}
      {error && (
        <div className="flex h-full flex-col items-center justify-center">
          <Image
            src={'/images/gitsearch-failed.svg'}
            width={150}
            height={150}
            alt="GitSearch Failed retrieving data icon"
          />
          <h1 className="mt-4 text-2xl font-bold text-error">{error}</h1>
        </div>
      )}
      {!loading &&
        !error &&
        searchType.name === SEARCH_TYPES.USERS &&
        (results as User[]).map(user => <UserCard key={user.id} data={user} />)}
      {!loading &&
        !error &&
        searchType.name === SEARCH_TYPES.REPOSITORIES &&
        (results as Repository[]).map(repo => (
          <RepoCard key={repo.id} data={repo} />
        ))}
    </div>
  );
}

export default SearchList;
