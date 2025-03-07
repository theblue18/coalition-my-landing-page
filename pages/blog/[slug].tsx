import { GetStaticProps, GetStaticPaths } from "next";
import { Typography, Container } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";

import Image from "next/image";
import Head from "next/head";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/contentful";
import { BlogPost } from "@/types/contentful";

// Custom render Rich Text để tránh lỗi <p> lồng trong <p>
const richTextOptions = {
  renderNode: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        {children}
      </Typography>
    ),
  },
};

interface BlogPageProps {
  post: BlogPost;
}

export default function BlogPage({ post }: BlogPageProps) {
  if (!post) return <p>Blog not found</p>;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
      </Head>

      <Container sx={{ marginTop: "50px", maxWidth: "800px" }}>
        <Typography variant="h2" gutterBottom data-cy="post-title">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {new Date(post.publishedDate).toLocaleDateString()}
        </Typography>
        <Image
          src={post.coverImage.url}
          alt={post.title}
          width={800}
          height={400}
          priority
        />
        <div>
          {documentToReactComponents(
            post.content.json as Document,
            richTextOptions
          )}
        </div>
      </Container>
    </>
  );
}

// GetStaticPaths: Generate all blog pages at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllBlogPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
};

// GetStaticProps: Fetch blog post data at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getBlogPostBySlug(params?.slug as string);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
   // revalidate: 60, 
  };
};
