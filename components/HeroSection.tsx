import { HeroType, HeroVariantType } from "@/types/contentful";
import { Typography, Container, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// Hero Wrapper (Full-width)
const HeroWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "500px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "left",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(8, 4),
}));

// Overlay for Dark Background (DEFAULT)
const HeroOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

// Hero Content
const HeroContent = styled(Container)(({ }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  maxWidth: "600px",
  zIndex: 2, // Ensure text is above overlay
}));

// Responsive Layout for Side Image Variants
const HeroSideWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: theme.spacing(8, 4),
  gap: theme.spacing(4),
}));

const HeroText = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  maxWidth: "600px",
}));

const HeroMediaWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "100%", // Full width on mobile
  },
}));

const HeroImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "8px",
});

const HeroVideo = styled("video")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "8px",
});

const Highlight = styled("span")(({ }) => ({
  backgroundColor: "#FFC72C",
  padding: "0px 8px",
  borderRadius: "4px",
  color: "black",
  fontWeight: "bold",
}));

const CTAContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));


const options = {
  renderNode: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <Typography variant="body1" sx={{ opacity: 0.8, marginBottom: "10px" }}>
        {children}
      </Typography>
    ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.HEADING_3]: (node: any, children: any) => <Typography variant="h3">{children}</Typography>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.HEADING_4]: (node: any, children: any) => <Typography variant="h4">{children}</Typography>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <Link href={node.data.uri} passHref>
        <Button variant="text" sx={{ color: "#0057FF", fontWeight: "bold" }}>{children}</Button>
      </Link>
    ),
  },
};

export default function HeroSection({ heroTitle, heroVariant, heroImage, heroCta, heroCtaLink, heroContent }: HeroType) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const isVideo = heroImage.url.endsWith(".mp4") || heroImage.url.endsWith(".webm");

  const renderMedia = () => (
    isVideo ? (
      <HeroVideo src={heroImage.url} autoPlay muted loop playsInline />
    ) : (
      <HeroImage src={heroImage.url} alt={"hero-image"} />
    )
  );

  const renderContent = () => (
    <>
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{ color: heroVariant === HeroVariantType.DEFAULT ? "white" : "black" }}
      >
        {heroTitle.includes("Active") ? (
          <>
            {heroTitle.split("Active")[0]}
            <Highlight>Active</Highlight>
            {heroTitle.split("Active")[1]}
          </>
        ) : (
          heroTitle
        )}
      </Typography>
      <Box sx={{ color: heroVariant === HeroVariantType.DEFAULT ? "white" : "black" }}>
        {documentToReactComponents(heroContent.json, options)}
      </Box>
      <CTAContainer>
        {heroCta && heroCtaLink && (
          <Link href={heroCtaLink} passHref>
            <Button variant="contained" sx={{ backgroundColor: "#0057FF", color: "white" }}>
              {heroCta}
            </Button>
          </Link>
        )}
      </CTAContainer>
    </>
  );

  return (
    <>
      {heroVariant === HeroVariantType.DEFAULT ? (
        <HeroWrapper sx={{ backgroundImage: isVideo ? "none" : `url(${heroImage.url})` }}>
          {!isVideo && <HeroOverlay />} {/* Dark overlay for text readability */}
          <HeroContent>{renderContent()}</HeroContent>
        </HeroWrapper>
      ) : (
        <HeroSideWrapper
          sx={{
            flexDirection: isMobile
              ? "column"
              : heroVariant === HeroVariantType.LEFT_SIDE_IMAGE
              ? "row-reverse"
              : "row",
          }}
        >
          <HeroText>{renderContent()}</HeroText>
          <HeroMediaWrapper>{renderMedia()}</HeroMediaWrapper>
        </HeroSideWrapper>
      )}
    </>
  );
}
