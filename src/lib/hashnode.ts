const HASHNODE_HOST = "lawrencenwuzor.hashnode.dev";
const HASHNODE_GQL = "https://gql.hashnode.com";

export type HashnodePost = {
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: { url: string } | null;
};

export async function getPosts(): Promise<HashnodePost[]> {
  try {
    const res = await fetch(HASHNODE_GQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          publication(host: "${HASHNODE_HOST}") {
            posts(first: 20) {
              edges {
                node {
                  title
                  brief
                  slug
                  publishedAt
                  readTimeInMinutes
                  coverImage { url }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = (await res.json()) as {
      data?: {
        publication?: {
          posts?: { edges: { node: HashnodePost }[] };
        };
      };
    };

    return json?.data?.publication?.posts?.edges?.map((e) => e.node) ?? [];
  } catch {
    return [];
  }
}
