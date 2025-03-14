import { GetServerSideProps } from "next";
import { Feed } from "feed";
import { getAllBlogPosts } from "@/lib/contentful";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllBlogPosts();
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.coalitioninc.com";

  const feed = new Feed({
    title: "Coalition Blog RSS Feed",
    description: "Latest blog posts from Coalition",
    id: websiteUrl,
    link: `${websiteUrl}/blog`,
    language: "en",
    image: `${websiteUrl}/favicon.ico`,
    favicon: `${websiteUrl}/favicon.ico`,
    copyright: "Coalition@CopyRight",
    updated: new Date(),
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${websiteUrl}/blog/${post.slug}`,
      link: `${websiteUrl}/blog/${post.slug}`,
      description: "Read more on our website.",
      date: new Date(post.publishedDate),
      author: [{ name: "Coalition Blog Team" }],
    });
  });

  
  res.setHeader("Content-Type", "application/rss+xml");
  res.write(feed.rss2());
  res.end();

  return { props: {} };
};

export default function RssPage() {
  return null; 
}
