import { print } from "graphql/language/printer";
import { ContentNode, Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PostQuery } from "./PostQuery";
import { FormattedDate } from "@/components/ui/FormattedDate";
import { Squares } from "@/components/ui/squares-background";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { siteConfig } from "@/config/metadata";

interface TemplateProps {
  node: ContentNode;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface QueryResponse {
  post: Post;
  relatedPosts: {
    nodes: RelatedPost[];
  };
}

const getColorFromString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
  return `#${color.padStart(6, '0')}`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

// Add this function to generate structured data
const generateStructuredData = (post: Post) => {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.node?.sourceUrl || siteConfig.ogImage,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Organization",
      name: "Vestesport",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Vestesport",
      logo: {
        "@type": "ImageObject",
        url: `/vestesport.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${post.slug}`,
    },
  };
};

export default async function PostTemplate({ node }: TemplateProps) {
  const { post, relatedPosts } = await fetchGraphQL<QueryResponse>(print(PostQuery), {
    id: node.databaseId,
  });

  return (
    <article className="relative">
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(post)),
        }}
      />
      
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden mt-6">
        <Squares
          speed={0.3}
          className="absolute inset-0 opacity-10 mt-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/90 mt-0" />

        <div className="container relative mx-auto px-4 pt-20 pb-16">
          {/* Back Button */}
          <div className="absolute left-4 top-8 md:left-8 md:top-8">
            <BackButton />
          </div>

          <header className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl/tight font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {post.title}
            </h1>

            <div className="flex items-center justify-center space-x-4 text-muted-foreground">
              {/* <div className="flex items-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary/10 mr-2" />
                <span className="font-medium">
                  {post.author?.node?.name ?? 'Autor Desconhecido'}
                </span>
              </div> */}
              <span className="text-primary/40">•</span>
              <FormattedDate
                date={post.date ?? ''}
                className="font-medium text-muted-foreground/80"
              />
            </div>
          </header>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-12" />

          <div className={cn(
            "prose prose-lg max-w-none",
            "prose-headings:text-foreground prose-headings:font-bold",
            "prose-p:text-muted-foreground prose-p:leading-relaxed",
            "prose-strong:text-foreground prose-strong:font-semibold",
            "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
            "prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1",
            "prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded",
            "prose-img:rounded-lg prose-img:shadow-lg"
          )}>
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </div>
        </div>
      </div>
      
      {/* Related Posts Section */}
      <div className="container mx-auto px-4 py-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              Últimas notícias
            </h2>
            <Button
              asChild
              variant="outline"
              className="text-primary hover:text-primary/90"
            >
              <Link href="/blog" className="inline-flex items-center">
                Ver notícias
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.nodes.slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} href={`/${relatedPost.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    {relatedPost.featuredImage ? (
                      <Image
                        src={relatedPost.featuredImage.node.sourceUrl}
                        alt={relatedPost.featuredImage.node.altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-gray-600"
                        style={{ backgroundColor: getColorFromString(relatedPost.title) }}
                      />
                    )}
                  </div>
                  <CardHeader>
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(relatedPost.date)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="text-muted-foreground line-clamp-3 h-[72px]"
                      dangerouslySetInnerHTML={{ __html: relatedPost.excerpt }}
                    />
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                        Ler mais
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
