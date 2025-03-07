import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import { getHeroData } from "../lib/contentful";
import { Container, Typography } from "@mui/material";
import { HeroData } from "../types/contentful"; 


export async function getStaticProps(): Promise<{ props: { heroData: HeroData | null }; revalidate: number }> {
  const heroData = await getHeroData();

  return { 
    props: { heroData },
    revalidate: 60, 
  };
}


interface HomeProps {
  heroData: HeroData | null;
}

export default function Home({ heroData }: HomeProps) {
  return (
    <Layout>
      <HeroSection heroData={heroData} />
      <Container sx={{ marginTop: "50px" }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Why Choose Us?
        </Typography>
      </Container>
    </Layout>
  );
}
