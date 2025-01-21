import { gql } from "graphql-tag";

export const HomePostsQuery = gql`
  query HomePostsQuery($first: Int = 9) {
    posts(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`; 