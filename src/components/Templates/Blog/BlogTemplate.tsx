import { Post } from "@/gql/graphql";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedDate } from "@/components/ui/FormattedDate";
import { Squares } from "@/components/ui/squares-background";

interface BlogTemplateProps {
    posts: {
        nodes: Post[];
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

export function BlogTemplate({ posts }: BlogTemplateProps) {
    return (
        <div className="relative">
            {/* Hero Section with Background */}
            <div className="relative overflow-hidden">
                <Squares
                    speed={0.3}
                    className="absolute inset-0 opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/90" />

                <div className="container relative mx-auto px-4 pt-20 pb-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                            Notícias
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Fique por dentro das últimas notícias e atualizações
                        </p>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.nodes.map((post) => (
                        <Link key={post.id} href={`/${post.slug}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                                    {post.featuredImage?.node?.sourceUrl ? (
                                        <Image
                                            src={post.featuredImage.node.sourceUrl}
                                            alt={post.featuredImage.node.altText || post.title || 'Post image'}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center text-gray-600"
                                            style={{ backgroundColor: getColorFromString(post.title || 'Default Title') }}
                                        />
                                    )}
                                </div>
                                <CardHeader>
                                    <div className="space-y-1">
                                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                        <FormattedDate
                                            date={post.date ?? ''}
                                            className="text-sm text-muted-foreground"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className="text-muted-foreground line-clamp-3 h-[72px]"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }}
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
            </div>
        </div>
    );
} 