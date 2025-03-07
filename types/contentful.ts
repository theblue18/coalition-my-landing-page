export interface HeroData {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: { json: any };
  heroImage: { url: string };
  ctaText: string;
  ctaLink: string;
}

export interface ContentfulResponse {
    contentModelCollection?: { items: HeroData[] }
}

export interface BlogPost {
    title: string;
    slug: string;
    publishedDate: string;
    coverImage: { url: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: { json: any };
  }