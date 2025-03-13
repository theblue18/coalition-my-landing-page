export async function fetchUnsplashImage(): Promise<string | null> {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
    if (!accessKey) {
      console.error("UNSPLASH API KEY is missing!");
      return null;
    }
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=technology&orientation=landscape&client_id=${accessKey}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch image from Unsplash");
      }
  
      const data = await response.json();
      return data.urls?.regular || null;
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      return null;
    }
  }
  