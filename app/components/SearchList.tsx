import React, { useCallback, useEffect, useRef } from 'react';
import { Repository, SearchOption, User } from '@/app/lib/types';

import Image from 'next/image';
import RepoCard from '@/app/components/RepoCard';
import { SEARCH_TYPES } from '@/app/lib/constants';
import UserCard from '@/app/components/UserCard';

interface SearchListProps {
  loading: boolean;
  error: string | null;
  searchType: SearchOption;
  results: User[] | Repository[];
  onReachScrollLimit: () => void;
}

function SearchList({
  loading,
  error,
  searchType,
  results,
  onReachScrollLimit,
}: SearchListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 /* scrollOffset */) {
        onReachScrollLimit();
      }
    }
  }, [onReachScrollLimit]);

  useEffect(() => {
    const refCurrent = listRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div
      ref={listRef}
      className={
        'flex h-[calc(100vh-250px)] flex-col space-y-6 overflow-y-auto overflow-x-hidden px-6 py-2'
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

      {!error &&
        searchType.name === SEARCH_TYPES.USERS &&
        (results as User[]).map((user, index) => (
          <UserCard key={`${user.id}-item${index}`} data={user} />
        ))}

      {!error &&
        searchType.name === SEARCH_TYPES.REPOSITORIES &&
        (results as Repository[]).map((repo, index) => (
          <RepoCard key={`${repo.id}-item${index}`} data={repo} />
        ))}
    </div>
  );
}

export default SearchList;
