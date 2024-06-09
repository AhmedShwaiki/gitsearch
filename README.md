## GitSearch

![logo-readme](https://github.com/AhmedShwaiki/gitsearch/assets/79656062/daeeba56-c7fd-419a-8403-e88f8f59e1f0)

## [Check out the app on vercel](https://gitsearch-silk.vercel.app/)

### Overview

GitSearch is a React application built with Next.js that allows users to search for GitHub users and repositories using the GitHub API. The application provides an intuitive and responsive UI for displaying search results with infinite scrolling.

### Technologies Used

- [React with Next.js](https://nextjs.org/)
- [HeadlessUI components library](https://headlessui.com/)
- [Tailwind CSS for styling](https://tailwindcss.com/docs/adding-custom-styles)
- [Octokit core SDK for API requests](https://www.npmjs.com/package/@octokit/core)

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

To run the unit tests for this project, you will need to add tests in __test__ folder then use the following command:

```bash
yarn test
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
3. Check any @TODO comments.
4. For MobX integration, refer to the [MobX documentation](https://mobx.js.org/README.html).
5. Setup and add integration tests
6. Add unit tests
