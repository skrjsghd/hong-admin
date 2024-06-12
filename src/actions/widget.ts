"use server";

export type SiteMetadata = {
  title: string | undefined;
  description: string | undefined;
  image: string | undefined;
} | null;
export async function getSiteMetadata(url: string): Promise<SiteMetadata> {
  try {
    const res = await fetch(url);
    const data = await res.text();
    // get title
    const title = data.match(/<title>(.*?)<\/title>/)?.[1];
    // get description
    const description = data.match(
      /<meta name="description" content="(.*?)"/,
    )?.[1];
    // get image
    const image = data.match(/<meta property="og:image" content="(.*?)"/)?.[1];

    const result = {
      title,
      description,
      image,
    };

    return result;
  } catch (error) {
    return null;
  }
}
