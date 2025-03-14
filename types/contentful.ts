export interface BlogPost {
  title: string;
  slug: string;
  publishedDate: string;
  coverImage: { url: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: { json: any };
  description: string;
}

export enum HeroVariantType {
  DEFAULT = "default",
  LEFT_SIDE_IMAGE = "leftSideImage",
  RIGHT_SIDE_IMAGE = "rightSideImage",
}

export type PageType = {
  slug: string;
  hero: HeroType;
};

export type HeroType = {
  heroTitle: string;
  heroVariant: HeroVariantType;
  heroImage: { url: string };
  heroCta: string;
  heroCtaLink: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroContent: { json: any };
};
