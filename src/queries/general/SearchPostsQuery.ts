import gql from "graphql-tag";

export const SearchPostsQuery = gql`
  query SearchPosts($search: String!) {
    posts(where: { search: $search }, first: 5) {
      nodes {
        id
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`; 