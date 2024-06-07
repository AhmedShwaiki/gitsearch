## Project Name

### Overview

### Technologies Used

#### Features

- **Select**: Choose between 'repositories' and 'users' for the search type.
- **Search**:
  - For 'users': Displays a list of users matching the query with their avatars, names, and profile links.
  - For 'repositories': Displays a list of repositories matching the query with tags/badges for file types, recent fork details, and links to the repositories.
- **Tags/Badges**: Convert file types in the repository into tags/badges (e.g., Python, JavaScript).
- **Fork Information**: Display usernames and avatars of the last 3 users who forked the repository, with links to their profiles.
- **State Handling**: Manage loading, error, and empty states.
- **Pagination**: Implement infinite scroll for paginated search results.

### How to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables (e.g., GitHub API key).

4. **Start the Development Server**:

   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

### Running Tests

#### Unit Tests

To run the unit tests for this project, use the following command:

```bash
yarn test
```

#### Integration and End-to-End (E2E) Tests

To run the integration and E2E tests, use the following command:

```bash
yarn test:e2e
```

### Project Structure

The project structure is as follows:

```

```

### Examples

#### Search for Users

1. Select 'users' from the dropdown.
2. Enter a username (e.g., "octocat") and click "Search".
3. View the list of matching users with their avatars, names, and profile links.

#### Search for Repositories

1. Select 'repositories' from the dropdown.
2. Enter a repository name (e.g., "react") and click "Search".
3. View the list of matching repositories with tags for file types, recent fork information, and repository links.

### How to Contribute

To contribute:
