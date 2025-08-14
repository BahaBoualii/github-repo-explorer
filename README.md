# GitHub Repository Explorer

A modern, minimalistic React application that allows users to explore GitHub repositories using the GitHub GraphQL API. Built with React 18, TypeScript, Vite, and ShadCN UI.

## ✨ Features

- **GitHub Username Search**: Enter any GitHub username to discover their public repositories
- **Advanced Filtering**: Filter repositories by name/description and programming language
- **Real-time Search**: Instant filtering with smooth animations
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme**: Automatic theme switching with manual toggle
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **GraphQL API**: Uses GitHub's v4 GraphQL API for efficient data fetching
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: ShadCN UI + Tailwind CSS
- **State Management**: Zustand + React Query
- **GraphQL**: Apollo Client
- **Testing**: Vitest + React Testing Library
- **Documentation**: Storybook
- **Code Quality**: ESLint + Prettier

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- GitHub Personal Access Token

## 🔧 Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd mvst-tech-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Add your GitHub Personal Access Token:

```env
VITE_GITHUB_TOKEN=your_github_token_here
```

**To get a GitHub token:**

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy the token and paste it in your `.env` file

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Available Scripts

| Script                    | Description                  |
| ------------------------- | ---------------------------- |
| `npm run dev`             | Start development server     |
| `npm run build`           | Build for production         |
| `npm run start`           | Start production server      |
| `npm run test`            | Run tests                    |
| `npm run test:ui`         | Run tests with UI            |
| `npm run test:coverage`   | Run tests with coverage      |
| `npm run test:storybook`  | Run Storybook tests          |
| `npm run storybook`       | Start Storybook              |
| `npm run build-storybook` | Build Storybook              |
| `npm run lint`            | Run ESLint                   |
| `npm run lint:fix`        | Fix ESLint issues            |
| `npm run format`          | Format code with Prettier    |
| `npm run format:check`    | Check code formatting        |
| `npm run typecheck`       | Run TypeScript type checking |

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run Storybook tests
npm run test:storybook
```

### Test Coverage

The project includes comprehensive test coverage for:

- Component rendering and interactions
- Utility functions
- State management
- API integration

## 📖 Storybook

Storybook provides interactive documentation for all UI components:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Visit `http://localhost:6006` to explore component stories and documentation.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # ShadCN UI components
│   ├── app.tsx         # Main app component
│   ├── app-layout.tsx  # App layout wrapper
│   ├── search-bar.tsx  # GitHub username search
│   ├── filters.tsx     # Repository filters
│   ├── repo-list.tsx   # Repository list
│   └── repo-card.tsx   # Individual repository card
├── lib/                 # Utility libraries
│   ├── apollo-client.ts # Apollo Client configuration
│   └── utils.ts        # Utility functions
├── store/               # State management
│   └── repo-store.ts   # Zustand store
├── types/               # TypeScript type definitions
│   └── github.ts       # GitHub API types
├── graphql/             # GraphQL queries
│   └── queries.ts      # GitHub API queries
└── test/                # Test setup
    └── setup.ts        # Vitest configuration
```

## 🎨 UI/UX Guidelines

The application follows modern design principles:

- **Minimalistic Design**: Clean, uncluttered interface
- **Consistent Spacing**: 4px grid system using Tailwind CSS
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Responsive Layout**: Mobile-first design approach
- **Dark Mode**: Automatic theme detection with manual toggle

## 🔌 API Integration

### GitHub GraphQL API

The application uses GitHub's v4 GraphQL API to fetch:

- User information
- Public repositories
- Repository metadata (stars, forks, language, etc.)
- Pagination support

### GraphQL Query

```graphql
query GetUserRepositories(
  $username: String!
  $first: Int = 100
  $after: String
) {
  user(login: $username) {
    repositories(
      first: $first
      after: $after
      orderBy: { field: UPDATED_AT, direction: DESC }
      isFork: false
      isPrivate: false
    ) {
      nodes {
        id
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
        updatedAt
      }
    }
  }
}
```

## 🚀 Future Improvements

- [ ] **Pagination**: Load more repositories with infinite scroll
- [ ] **Repository Details**: Expandable repository information
- [ ] **User Profiles**: Display user information and statistics
- [ ] **Advanced Filters**: Filter by stars, forks, date ranges
- [ ] **Search History**: Remember recent searches
- [ ] **Export Data**: Download repository data as CSV/JSON
- [ ] **Performance**: Implement virtual scrolling for large lists
- [ ] **Offline Support**: Service worker for offline access
- [ ] **Internationalization**: Multi-language support
- [ ] **Analytics**: Track usage patterns and popular searches

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) for beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [GitHub GraphQL API](https://docs.github.com/en/graphql) for data
- [React Router](https://reactrouter.com/) for routing
- [Vite](https://vitejs.dev/) for fast build tooling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your environment details and steps to reproduce

---

**Happy coding! 🎉**
