export interface Owner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  owner: Owner;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  profile: string;
}

export type SearchType = 'Users' | 'Repositories';
