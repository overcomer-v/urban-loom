export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "fashion";

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
}