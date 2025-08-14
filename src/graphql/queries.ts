import { gql } from '@apollo/client';

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories(
    $username: String!
    $first: Int = 100
    $after: String
  ) {
    user(login: $username) {
      id
      login
      name
      avatarUrl
      repositories(
        first: $first
        after: $after
        orderBy: { field: UPDATED_AT, direction: DESC }
        isFork: false
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          isPrivate
          updatedAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;
