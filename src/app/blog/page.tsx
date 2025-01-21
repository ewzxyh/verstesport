import { BlogTemplate } from "@/components/Templates/Blog/BlogTemplate";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";
import { BlogQuery } from "@/components/Templates/Blog/BlogQuery";

export default async function BlogPage() {
  const data = await fetchGraphQL(print(BlogQuery), {});
  return <BlogTemplate posts={data.posts} />;
} 