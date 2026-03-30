const ACCESS_TOKEN = import.meta.env.VITE_TMDB_JWT;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMedia({ media }: { media: string }) {
  const res = await fetch(`${BASE_URL}/${media}/popular`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to load ${media}`);
  }

  return data.results;
}

export async function getGenres({ media }: { media: string }) {
  const res = await fetch(`${BASE_URL}/genre/${media}/list`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to load ${media} genre list: ${data?.error}`);
  }

  return data.data;
}
