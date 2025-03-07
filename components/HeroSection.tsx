"use client";

import { Typography, Button, Container, Box } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { HeroData } from "@/types/contentful";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import Image from "next/image";

const HeroWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  height: "500px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  textAlign: "center",
  color: "white",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
});

const HeroContent = styled(Container)({
  position: "relative",
  zIndex: 2,
});

interface HeroSectionProps {
  heroData: HeroData | null;
}

const richTextOptions = {
  renderNode: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <Typography variant="body1" sx={{ opacity: 0.8, marginBottom: "10px" }}>
        {children}
      </Typography>
    ),
  },
};

export default function HeroSection({ heroData }: HeroSectionProps) {
  const optimizedImageUrl = heroData?.heroImage?.url
    ? `${heroData.heroImage.url}?w=1920&h=1080&fm=webp&q=80`
    : "/default-hero.jpg";

  return (
    <HeroWrapper>
      <Image
        src={optimizedImageUrl}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        priority 
    
      />

      <Overlay />
      <HeroContent>
        <Container>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            {heroData?.title}
          </Typography>
          {documentToReactComponents(
            heroData?.description.json as Document,
            richTextOptions
          )}

          <Link href={heroData?.ctaLink || "#"} passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff6b6b",
                color: "white",
                fontSize: "18px",
              }}
            >
              {heroData?.ctaText}
            </Button>
          </Link>
        </Container>
      </HeroContent>
    </HeroWrapper>
  );
}
