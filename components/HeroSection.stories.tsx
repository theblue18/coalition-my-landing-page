import { Meta, StoryObj } from "@storybook/react";
import HeroSection from "./HeroSection";
import { HeroVariantType, HeroType, PageType } from "@/types/contentful";
import { fetchUnsplashImage } from "@/lib/unsplash";

export default {
  title: "Components/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof HeroSection>;


async function createHeroMock(heroVariant: HeroVariantType): Promise<HeroType> {
  const unsplashImage = await fetchUnsplashImage();

  return {
    heroTitle: "Protect your business from cyber threats with Active Insurance",
    heroVariant,
    heroImage: { url: unsplashImage || "https://via.placeholder.com/1600x900" },
    heroCta: "Get Started",
    heroCtaLink: "/about-us",
    heroContent: {
      json: {
        data: {},
        content: [
          {
            data: {},
            content: [{ data: {}, marks: [], value: "Cyber insurance for your business.", nodeType: "text" }],
            nodeType: "paragraph",
          },
        ],
        nodeType: "document",
      },
    },
  };
}

async function createPageMock(heroVariant: HeroVariantType): Promise<PageType> {
  const heroMock = await createHeroMock(heroVariant);
  return {
    slug: "hero",
    hero: heroMock,
  };
}


export const Default: StoryObj<typeof HeroSection> = {
  args: await createHeroMock(HeroVariantType.DEFAULT),
};

export const LeftSideImage: StoryObj<typeof HeroSection> = {
  args: await createHeroMock(HeroVariantType.LEFT_SIDE_IMAGE),
};

export const RightSideImage: StoryObj<typeof HeroSection> = {
  args: await createHeroMock(HeroVariantType.RIGHT_SIDE_IMAGE),
};

export const PageWithHero: StoryObj<typeof HeroSection> = {
  args: (await createPageMock(HeroVariantType.DEFAULT)).hero,
};
