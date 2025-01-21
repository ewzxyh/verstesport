import { gql } from "graphql-tag";

export const PostQuery = gql`
  query PostQuery($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      title
      content
      date
      modified
      slug
      excerpt
      seo {
        title
        metaDesc
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          name
          description
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
    relatedPosts: posts(
      first: 3,
      where: {
        orderby: { field: DATE, order: DESC }
        notIn: [$id]
      }
    ) {
      nodes {
        id
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
      }
    }
  }
`;
