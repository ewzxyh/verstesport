import { gql } from 'graphql-tag';

export const HomePageQuery = gql`
  query HomePageQuery {
    posts(first: 10, where: { status: PUBLISH }) {
      nodes {
        title
        content
        slug
        date
      }
    }
  }
`; 