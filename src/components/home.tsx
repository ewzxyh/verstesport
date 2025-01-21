import { print } from "graphql/language/printer";
import { Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PostCard } from "@/components/ui/PostCard";
import gql from "graphql-tag";

const HomePageQuery = gql`
  query HomePageQuery {
    posts(first: 9, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        slug
        date
        excerpt
        databaseId
      }
    }
  }
`;

export default async function HomePage() {
  const { posts } = await fetchGraphQL<{ posts: { nodes: Post[] } }>(
    print(HomePageQuery)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubra artigos sobre tecnologia, desenvolvimento e design.
          Acompanhe as últimas novidades e aprenda com nosso conteúdo.
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Posts Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.nodes.map((post) => (
            <PostCard
              key={post.databaseId}
              title={post.title || ""}
              content={post.excerpt || ""}
              date={post.date || ""}
              slug={post.slug || ""}
            />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-16 bg-card rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Receba as últimas atualizações diretamente no seu email. 
          Sem spam, apenas conteúdo relevante.
        </p>
        <div className="flex gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu melhor email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Inscrever
          </button>
        </div>
      </section>
    </div>
  );
}
