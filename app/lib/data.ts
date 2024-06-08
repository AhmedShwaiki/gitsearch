import toCamelCase from '../utils/toCamelCase';

export function generateMockRepoData(count: number) {
  const mockRepoData = [];

  for (let i = 1; i <= count; i++) {
    mockRepoData.push({
      id: i,
      name: `Repo ${i}`,
      owner: {
        login: `user${i}`,
        avatar_url:
          'https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
        html_url: `https://github.com/user${i}`,
      },
      html_url: `https://github.com/user${i}/repo${i}`,
      description: `Description for repo ${i}`,
      language: 'JavaScript',
      stargazers_count: Math.floor(Math.random() * 100),
      forks_count: Math.floor(Math.random() * 100),
      open_issues_count: Math.floor(Math.random() * 100),
    });
  }

  return mockRepoData;
}

export function generateMockUserData() {
  const mockData = {
    total_count: 6,
    incomplete_results: false,
    items: [
      {
        login: 'test',
        id: 383316,
        node_id: 'MDQ6VXNlcjM4MzMxNg==',
        avatar_url: 'https://avatars.githubusercontent.com/u/383316?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/test',
        html_url: 'https://github.com/test',
        followers_url: 'https://api.github.com/users/test/followers',
        following_url:
          'https://api.github.com/users/test/following{/other_user}',
        gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/test/subscriptions',
        organizations_url: 'https://api.github.com/users/test/orgs',
        repos_url: 'https://api.github.com/users/test/repos',
        events_url: 'https://api.github.com/users/test/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/test/received_events',
        type: 'User',
        site_admin: false,
        score: 1,
      },
      {
        login: 'testcontainers',
        id: 13393021,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjEzMzkzMDIx',
        avatar_url: 'https://avatars.githubusercontent.com/u/13393021?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/testcontainers',
        html_url: 'https://github.com/testcontainers',
        followers_url: 'https://api.github.com/users/testcontainers/followers',
        following_url:
          'https://api.github.com/users/testcontainers/following{/other_user}',
        gists_url:
          'https://api.github.com/users/testcontainers/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/testcontainers/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/testcontainers/subscriptions',
        organizations_url: 'https://api.github.com/users/testcontainers/orgs',
        repos_url: 'https://api.github.com/users/testcontainers/repos',
        events_url:
          'https://api.github.com/users/testcontainers/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/testcontainers/received_events',
        type: 'Organization',
        site_admin: false,
        score: 1,
      },
      {
        login: 'TestLeafPages',
        id: 21636478,
        node_id: 'MDQ6VXNlcjIxNjM2NDc4',
        avatar_url: 'https://avatars.githubusercontent.com/u/21636478?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/TestLeafPages',
        html_url: 'https://github.com/TestLeafPages',
        followers_url: 'https://api.github.com/users/TestLeafPages/followers',
        following_url:
          'https://api.github.com/users/TestLeafPages/following{/other_user}',
        gists_url: 'https://api.github.com/users/TestLeafPages/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/TestLeafPages/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/TestLeafPages/subscriptions',
        organizations_url: 'https://api.github.com/users/TestLeafPages/orgs',
        repos_url: 'https://api.github.com/users/TestLeafPages/repos',
        events_url:
          'https://api.github.com/users/TestLeafPages/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/TestLeafPages/received_events',
        type: 'User',
        site_admin: false,
        score: 1,
      },
      {
        login: 'astaxie',
        id: 233907,
        node_id: 'MDQ6VXNlcjIzMzkwNw==',
        avatar_url: 'https://avatars.githubusercontent.com/u/233907?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/astaxie',
        html_url: 'https://github.com/astaxie',
        followers_url: 'https://api.github.com/users/astaxie/followers',
        following_url:
          'https://api.github.com/users/astaxie/following{/other_user}',
        gists_url: 'https://api.github.com/users/astaxie/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/astaxie/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/astaxie/subscriptions',
        organizations_url: 'https://api.github.com/users/astaxie/orgs',
        repos_url: 'https://api.github.com/users/astaxie/repos',
        events_url: 'https://api.github.com/users/astaxie/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/astaxie/received_events',
        type: 'User',
        site_admin: false,
        score: 1,
      },
      {
        login: 'LambdaTest',
        id: 27130435,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjI3MTMwNDM1',
        avatar_url: 'https://avatars.githubusercontent.com/u/27130435?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/LambdaTest',
        html_url: 'https://github.com/LambdaTest',
        followers_url: 'https://api.github.com/users/LambdaTest/followers',
        following_url:
          'https://api.github.com/users/LambdaTest/following{/other_user}',
        gists_url: 'https://api.github.com/users/LambdaTest/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/LambdaTest/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/LambdaTest/subscriptions',
        organizations_url: 'https://api.github.com/users/LambdaTest/orgs',
        repos_url: 'https://api.github.com/users/LambdaTest/repos',
        events_url: 'https://api.github.com/users/LambdaTest/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/LambdaTest/received_events',
        type: 'Organization',
        site_admin: false,
        score: 1,
      },
      {
        login: 'testerSunshine',
        id: 20162049,
        node_id: 'MDQ6VXNlcjIwMTYyMDQ5',
        avatar_url: 'https://avatars.githubusercontent.com/u/20162049?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/testerSunshine',
        html_url: 'https://github.com/testerSunshine',
        followers_url: 'https://api.github.com/users/testerSunshine/followers',
        following_url:
          'https://api.github.com/users/testerSunshine/following{/other_user}',
        gists_url:
          'https://api.github.com/users/testerSunshine/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/testerSunshine/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/testerSunshine/subscriptions',
        organizations_url: 'https://api.github.com/users/testerSunshine/orgs',
        repos_url: 'https://api.github.com/users/testerSunshine/repos',
        events_url:
          'https://api.github.com/users/testerSunshine/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/testerSunshine/received_events',
        type: 'User',
        site_admin: false,
        score: 1,
      },
    ],
  };
  return toCamelCase(mockData);
}
