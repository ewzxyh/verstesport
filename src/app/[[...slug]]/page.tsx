import { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentInfoQuery } from "@/queries/general/ContentInfoQuery";
import { ContentNode } from "@/gql/graphql";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import PostTemplate from "@/components/Templates/Post/PostTemplate";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { HomePostsQuery } from "@/queries/general/HomePostsQuery";
import HomeTemplate from "@/components/Templates/Home/HomeTemplate";

// Optional: force dynamic if you wish
// export const dynamic = "force-dynamic";

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props;

  if (!params?.slug) {
    return {
      title: "Página Inicial",
      description:
        "Seu portal de notícias esportivas - Acompanhe as últimas notícias do mundo do esporte, futebol, basquete, vôlei e muito mais.",
    };
  }

  const slug = nextSlugToWpSlug(params.slug.join("/"));
  const isPreview = slug.includes("preview");

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SeoQuery),
    {
      slug: isPreview ? slug.split("preview/")[1] : slug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    },
  );

  if (!contentNode) {
    return notFound();
  }

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  };
}

export function generateStaticParams() {
  return [];
}

export default async function Page(props: any) {
  const { params } = props;

  if (!params?.slug) {
    try {
      const { posts } = await fetchGraphQL<{ posts: { nodes: any[] } }>(
        print(HomePostsQuery),
        { first: 9 },
      );

      if (!posts?.nodes) {
        console.error("Nenhum post encontrado");
        return <HomeTemplate posts={[]} />;
      }

      return <HomeTemplate posts={posts.nodes} />;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      return <HomeTemplate posts={[]} />;
    }
  }

  const slug = nextSlugToWpSlug(params.slug.join("/"));
  const isPreview = slug.includes("preview");

  try {
    const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
      print(ContentInfoQuery),
      {
        slug: isPreview ? slug.split("preview/")[1] : slug,
        idType: isPreview ? "DATABASE_ID" : "URI",
      },
    );

    if (!contentNode) {
      return notFound();
    }

    switch (contentNode.contentTypeName) {
      case "page":
        return <PageTemplate node={contentNode} />;
      case "post":
        return <PostTemplate node={contentNode} />;
      default:
        return notFound();
    }
  } catch (error) {
    console.error("Erro ao buscar conteúdo:", error);
    return notFound();
  }
}