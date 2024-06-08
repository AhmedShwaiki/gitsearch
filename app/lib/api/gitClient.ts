import { Octokit } from '@octokit/core';
import config from '@/app/config';
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
      throw new GitClientError(`GitHub API responded with an error: ${error.response.status}`);
    } else if (error.request) {
      throw new GitClientError('No response received from GitHub API.');
    } else {
      throw new GitClientError(`Error in setting up the request: ${error.message}`);
    }
  }

  public static use<T>(ClientKit: new (options: any) => T, clientConfig: any): GitClient<T> {
    if (!GitClient.instance) {
      GitClient.instance = new GitClient(ClientKit, clientConfig);
    }
    return GitClient.instance;
  }

  async searchByUsername({ username, page = 1, sortBy, order }: { username: string, page?: number, sortBy?: string, order?: string }) {
    const queryParams = new URLSearchParams();
    queryParams.append('q', username);
    queryParams.append('page', page.toString());

    if (sortBy) queryParams.append('sort', sortBy);
    if (order) queryParams.append('order', order);

    const response = await (this.client as any).request({
      method: 'GET',
      url: `/search/users?${queryParams.toString()}`,
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    return toCamelCase(response.data);
  }

  async searchByRepoName({ repoName, page = 1, sortBy, order }: { repoName: string, page?: number, sortBy?: string, order?: string }) {
    const queryParams = new URLSearchParams();
    queryParams.append('q', repoName);
    queryParams.append('page', page.toString());

    if (sortBy) queryParams.append('sort', sortBy);
    if (order) queryParams.append('order', order);

    const response = await (this.client as any).request({
      method: 'GET',
      url: `/search/repositories?${queryParams.toString()}`,
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    return toCamelCase(response.data);
  }
}

const octokitConfig = {
  auth: config.GITHUB_AUTH_TOKEN,
};

export default GitClient.use(Octokit, octokitConfig);
