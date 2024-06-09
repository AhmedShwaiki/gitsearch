import {
  Fork,
  Pagination,
  Repository,
  RepositoryDetails,
  User,
} from '@/app/lib/types';

import { Octokit } from '@octokit/core';
import toCamelCase from '@/app/utils/toCamelCase';

class GitClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitClientFetchError';
  }
}

class GitClient<T> {
  private static instance: GitClient<any> | null = null;
  private client: T;

  private constructor(ClientKit: new (options: any) => T, clientConfig: any) {
    this.client = new ClientKit(clientConfig);

    (this.client as any).hook.error('request', (error: any) => {
      this.handleError(error);
    });
  }

  private handleError(error: any) {
    if (error.response) {
      throw new GitClientError(
        `GitHub API responded with an error: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new GitClientError('No response received from GitHub API.');
    } else {
      throw new GitClientError(
        `Error in setting up the request: ${error.message}`,
      );
    }
  }

  public static use<T>(
    ClientKit: new (options: any) => T,
    clientConfig: any,
  ): GitClient<T> {
    if (!GitClient.instance) {
      GitClient.instance = new GitClient(ClientKit, clientConfig);
    }
    return GitClient.instance;
  }

  async searchByUsername({
    username,
    page = 1,
    sortBy,
    order,
  }: {
    username: string;
    page?: number;
    sortBy?: string;
    order?: string;
  }): Promise<Pagination<User>> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', username);
    queryParams.append('page', page.toString());

    if (sortBy) queryParams.append('sort', sortBy);
    if (order) queryParams.append('order', order);

    const response = await (this.client as any).request({
      method: 'GET',
      url: `/search/users?${queryParams.toString()}`,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });
    const data = toCamelCase(response.data);
    // const response = generateMockUserData()
    // const data = toCamelCase(response);

    return {
      items: data.items.map((item: any) => ({
        id: item.id,
        name: item.login,
        avatar: item.avatarUrl,
        profile: item.htmlUrl,
      })) as User[],
      totalCount: data.totalCount,
      incompleteResults: data.incompleteResults,
    };
  }

  async searchByRepoName({
    repoName,
    page = 1,
    sortBy,
    order,
  }: {
    repoName: string;
    page?: number;
    sortBy?: string;
    order?: string;
  }): Promise<Pagination<Repository>> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', repoName);
    queryParams.append('page', page.toString());

    if (sortBy) queryParams.append('sort', sortBy);
    if (order) queryParams.append('order', order);

    const response = await (this.client as any).request({
      method: 'GET',
      url: `/search/repositories?${queryParams.toString()}`,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });
    const data = toCamelCase(response.data);
    // const response = generateMockRepoData();
    // const data = toCamelCase(response);
    return {
      items: data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        owner: {
          id: item.owner.id,
          name: item.owner.login,
          avatar: item.owner.avatarUrl,
          profile: item.owner.htmlUrl,
        },
        forksCount: item.forksCount,
        openIssuesCount: item.openIssuesCount,
        url: item.htmlUrl,
        description: item.description,
        language: item.language,
      })) as Repository[],
      totalCount: data.totalCount,
      incompleteResults: data.incompleteResults,
    };
  }

  async getRepoDetails({
    owner,
    name,
  }: {
    owner: string;
    name: string;
  }): Promise<RepositoryDetails> {
    const GET_REPO_DETAILS = `
      query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          forks(last: 3) {
            nodes {
              url
              id
              owner {
                id
                login
                avatarUrl
                url
              }
            }
          }
          languages(first: 3) {
            nodes {
              name
            }
          }
        }
      }
      `;
    // const response = generateMockGetRepoDetails()

    const response = await (this.client as any).graphql(GET_REPO_DETAILS, {
      owner,
      name,
    });

    const data = toCamelCase(response);

    return {
      forks: data.repository.forks.nodes.map((fork: any) => ({
        id: fork.id,
        url: fork.url,
        owner: {
          id: fork.owner.id,
          name: fork.owner.login,
          avatar: fork.owner.avatarUrl,
          profile: fork.owner.url,
        } as User,
      })) as Fork[],
      languages: data.repository.languages.nodes.map(
        (language: { name: string }) => language.name,
      ) as string[],
    };
  }
}

const config = {
  auth: process.env.GITHUB_TOKEN,
};

export default GitClient.use(Octokit, config);
