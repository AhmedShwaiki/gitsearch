## GitSearch

### Overview
GitSearch is a React application built with Next.js that allows users to search for GitHub users and repositories using the GitHub API. The application provides an intuitive and responsive UI for displaying search results with infinite scrolling.

### Technologies Used
- React with Next.js
- Headless UI components library
- Tailwind CSS for styling
- Octokit SDK for API requests

### How to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AhmedShwaiki/gitsearch.git
   cd gitsearch
   ```

2. **Install Dependencies**:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables (e.g., GitHub API key).

   ```
   GITHUB_API_KEY=your_github_api_key
   ```

4. **Start the Development Server**:

   ```bash
   yarn run dev
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
app/                    # Main source code directory
 ├── components/        # Contains all the UI components
 ├── lib/               # Contains data-related logic, including APIs, constants, and types
 ├── utils/             # Contains utility functions
 └── page/              # Directory for the home page
```

### How to Contribute

To contribute:
1. Implement a Virtual list for improved performance with large data sets. Refer to [this npm package](https://www.npmjs.com/package/rc-virtual-list).
2. Enhance error handling and user feedback.
3. Add caching and state management with MobX.
4. For MobX integration, refer to the [MobX documentation](https://mobx.js.org/README.html).
