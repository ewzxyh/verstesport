import { print } from "graphql/language/printer";
import { SearchPostsQuery } from "@/queries/general/SearchPostsQuery";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return Response.json({ posts: [] });
  }

  try {
    const { posts } = await fetchGraphQL(print(SearchPostsQuery), {
      search: query,
    });

    return Response.json({ posts });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return Response.json({ posts: [] }, { status: 500 });
  }
} 