import { MetadataRoute } from "next";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";
import { gql } from '@apollo/client';

const SitemapQuery = gql`
  query SitemapQuery {
    posts(first: 1000) {
      nodes {
        slug
        modified
      }
    }
    pages(first: 1000) {
      nodes {
        slug
        modified
      }
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, pages } = await fetchGraphQL(print(SitemapQuery));

  const postsEntries = posts.nodes.map((post: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
    lastModified: post.modified,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const pagesEntries = pages.nodes.map((page: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${page.slug}`,
    lastModified: page.modified,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL!,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postsEntries,
    ...pagesEntries,
  ]
}
