import {
  BlogPost,
  ContentfulResponse,
  HeroData,
  PageType,
} from "@/types/contentful";
import { GraphQLClient } from "graphql-request";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

if (!GRAPHQL_API_URL || !ACCESS_TOKEN) {
  console.error(
    "Error: Missing Contentful environment variables!",
    "\nCONTENTFUL_GRAPHQL_API_URL:",
    GRAPHQL_API_URL,
    "\nCONTENTFUL_ACCESS_TOKEN:",
    ACCESS_TOKEN
  );
  throw new Error(
    "Missing Contentful API credentials. Please check your .env.local file."
  );
}

const client = new GraphQLClient(`${GRAPHQL_API_URL}/${SPACE_ID}`, {
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

export async function getHeroData(): Promise<HeroData | null> {
  let query = `
    query {
      contentModelCollection(limit: 1) {
        items {
          title
          description { json }
          heroImage { url }
          ctaText
          ctaLink
        }
      }
    }
  `;

  query = query.replace(/\s+/g, " ").trim();

  try {
    const response = await client.request<ContentfulResponse>(query);

    if (!response?.contentModelCollection?.items?.length) {
      console.warn("No data found in Contentful.");
      return null;
    }

    return response.contentModelCollection.items[0];
  } catch (error) {
    console.error("Error fetching hero data from Contentful:", error);
    return null; // Trả về null thay vì để lỗi làm crash ứng dụng
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  let query = `
    query {
      blogPostCollection {
        items {
          title
          slug
          publishedDate
          coverImage { url }
          content { json }
        }
      }
    }
  `;
  query = query.replace(/\s+/g, " ").trim();
  try {
    const response = await client.request<{
      blogPostCollection: { items: BlogPost[] };
    }>(query);
    return response.blogPostCollection.items;
  } catch (error) {
    console.error(" Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  let query = `
    query ($slug: String!) {
      blogPostCollection(where: { slug: $slug }, limit: 1) {
        items {
          title
          slug
          publishedDate
          coverImage { url }
          content { json }
        }
      }
    }
  `;
  query = query.replace(/\s+/g, " ").trim();
  try {
    const response = await client.request<{
      blogPostCollection: { items: BlogPost[] };
    }>(query, { slug });
    return response.blogPostCollection.items[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<PageType | null> {
  let query = `
    query ($slug: String!) {
      pageModelCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        hero {
            ... on HeroModel {
            sys { id }
            heroTitle
            heroVariant
            heroImage { url }
            heroCta
            heroCtaLink
            heroContent { json }
          }
        }
      }
    }
  }
`;

  query = query.replace(/\s+/g, " ").trim();

  try {
    const response = await client.request<{
      pageModelCollection: { items: PageType[] };
    }>(query, { slug });
    return response.pageModelCollection.items[0] || null;
  } catch (error) {
    console.error(
      `Error fetching blog post with slug "${slug}":`,
      JSON.stringify(error, null, 2)
    );
    return null;
  }
}

export async function getAllPageSlugs() {
  const query = `
    query {
      pageModelCollection {
        items {
          slug
        }
      }
    }
  `;

  try {
    const response = await client.request<{
      pageModelCollection: { items: { slug: string }[] };
    }>(query);

    const paths =
      response.pageModelCollection?.items.map((page) => ({
        params: { slug: [page.slug] },
      })) || [];

    // Thêm đường dẫn cho trang gốc
    paths.push({ params: { slug: [] } });

    return paths;
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return [];
  }
}
