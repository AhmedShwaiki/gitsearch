"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Repository, SearchType, User } from '@/app/lib/types';
import Selector, { Option } from '@/app/components/Selector';
import { generateMockRepoData, generateMockUserData } from './lib/data';

import Header from '@/app/components/Header';
import Input from '@/app/components/Input';
import RepoCard from '@/app/components/RepoCard';
import { SEARCH_TYPES } from '@/app/lib/constants';
import UserCard from '@/app/components/UserCard';
import debounce from '@/app/utils/debounce';

const searchUsers = async ({ query, page }: { query: string; page: number }) => {
    const response = generateMockUserData()
    console.log(response);

    // const response = await GitClient.searchByUsername({ username: query, page });
    return {
        items: response.items.map((item: any) => ({
            id: item.id,
            name: item.login,
            avatar: item.avatarUrl,
            profile: item.htmlUrl,
        })),
        totalCount: response.totalCount,
        incompleteResults: response.incompleteResults,
    };
};

const searchRepositories = async ({ query, page }: { query: string; page: number }) => {
    const response = generateMockRepoData(100)

    // const response = await GitClient.searchByRepoName({ repoName: query, page });
    return {
        items: response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            owner: item.owner.login,
            avatar: item.owner.avatarUrl,
            description: item.description,
            language: item.language,
            stargazersCount: item.stargazersCount,
            forksCount: item.forksCount,
            openIssuesCount: item.openIssuesCount,
        })),
        totalCount: response.totalCount,
        incompleteResults: response.incompleteResults,
    };
};

const CHARACTER_SEARCH_LIMIT = 3;
const DEBOUNCE_DELAY = 300;
const searchOptions = [
    { id: 1, name: SEARCH_TYPES.USERS },
    { id: 2, name: SEARCH_TYPES.REPOSITORIES },
];


const createSearchByTypeFunction = (searchType: SearchType) => {
    const searchFunctions = {
        [SEARCH_TYPES.USERS]: searchUsers,
        [SEARCH_TYPES.REPOSITORIES]: searchRepositories,
    };

    const searchFunction = searchFunctions[searchType];
    if (!searchFunction) {
        throw new Error("Invalid search type");
    }
    return searchFunction;
};


const Home = () => {
    const [searchType, setSearchType] = useState<Option>(searchOptions[0]);
    const [query, setQuery] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<User[] | Repository[]>([]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setLoading(false);
        setError('');

        setInputValue(newValue);

        const trimmedValue = newValue.trim();
        // TODO: create string validation function
        if (trimmedValue.length >= CHARACTER_SEARCH_LIMIT) {
            debounce(() => setQuery(trimmedValue), DEBOUNCE_DELAY)();
        }
    }, []);

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
            setError(null);
            try {
                const searchFunction = createSearchByTypeFunction(searchType.name as SearchType);
                const response = await searchFunction({ query, page: 1 });

                setResults(response.items);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, searchType]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-8 bg-gradient-to-b from-background-start to-background-end text-foreground">
            <div className="w-full max-w-5xl">
                <Header />
                <div className="flex justify-around w-full max-w-5xl mb-8 space-x-5">
                    <div className="w-2/3">
                        <Input value={inputValue} placeholder={`Enter ${CHARACTER_SEARCH_LIMIT} or more characters`} onChange={handleInputChange} />
                    </div>
                    <div className="z-10">
                        <Selector placeholder={'Search by'} options={searchOptions} selected={searchType} onSelect={handleSelectSearchTypeChange} />
                    </div>
                </div>

                <div className="flex flex-col space-y-6 h-[720px] overflow-y-scroll py-2 px-6 overflow-x-hidden">
                    {searchType.name === SEARCH_TYPES.USERS && (results as User[]).map(user => (
                        <UserCard key={user.id} data={user} />
                    ))}
                    {searchType.name === SEARCH_TYPES.REPOSITORIES && (results as Repository[]).map(repo => (
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
