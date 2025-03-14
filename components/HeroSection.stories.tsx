import { Meta, StoryObj } from "@storybook/react";
import HeroSection from "./HeroSection";
import { HeroVariantType, HeroType, PageType } from "@/types/contentful";
import { fetchUnsplashImage } from "@/lib/unsplash";
import { withContentful } from 'storybook-addon-contentful-preview';
import { JSX } from "react";
const ENTRY_ID = process.env.NEXT_PUBLIC_STORYBOOK_ENTRY_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

export default {
  title: "Components/HeroSection",
  component: HeroSection,
  decorators: [withContentful],
  parameters: {
    layout: "fullscreen",
    contentfulPreview: {
      spaceId: SPACE_ID,
      accessToken: ACCESS_TOKEN,
      entryId: ENTRY_ID,
    }
  },
} as Meta<typeof HeroSection>;

const Template = (args: JSX.IntrinsicAttributes & HeroType) => <HeroSection {...args} />;

export const Default2 = Template.bind({});



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
