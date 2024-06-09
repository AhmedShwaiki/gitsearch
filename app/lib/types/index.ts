export type SearchType = 'Users' | 'Repositories';

export interface User {
  id: number;
  name: string;
  avatar: string;
  profile: string;
}

export interface Fork {
  id: string;
  url: string;
  owner: User;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  forksCount: number;
  openIssuesCount: number;
  url: string;
  owner: User;
}

export interface RepositoryDetails {
  forks: Fork[];
  languages: string[];
}

export interface Pagination<T> {
  items: T[];
  totalCount: number;
  incompleteResults: boolean;
}

export interface SearchOption {
  id: number;
  name: string;
  unavailable?: boolean;
}
