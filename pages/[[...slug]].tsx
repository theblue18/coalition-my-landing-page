import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPageSlugs, getPageBySlug } from "@/lib/contentful";
import HeroSection from "@/components/HeroSection";
import { PageType } from "@/types/contentful";
import Layout from "@/components/Layout";
import { Box } from "@mui/material";

export default function Page({ page }: { page: PageType }) {
  if (!page) return <p>Page not found</p>;

  return (
    <Layout>
      <Box>
        <HeroSection {...page.hero} />
      </Box>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPageSlugs();
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ? (params.slug as string[]).join("/") : "home";
  const page = await getPageBySlug(slug);

  if (!page) return { notFound: true };

  return {
    props: { page },
    revalidate: 60,
  };
};
