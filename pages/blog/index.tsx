import { GetStaticProps } from "next";
import Link from "next/link";
import { Typography, Container, Card, CardMedia, CardContent } from "@mui/material";
import { getAllBlogPosts } from "@/lib/contentful";
import { BlogPost } from "@/types/contentful";
import Layout from "@/components/Layout";


interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <Layout>
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h2" textAlign="center" gutterBottom>
        Blog Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post.slug} sx={{ marginBottom: "20px" }}  >
          <CardMedia component="img" height="200" image={post.coverImage.url} alt={post.title} />
          <CardContent>
            <Typography variant="h5" >
              <Link href={`/blog/${post.slug}`} passHref data-cy="blog-post">
                {post.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(post.publishedDate).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
   
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};
