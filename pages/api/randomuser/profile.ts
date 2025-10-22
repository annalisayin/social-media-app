import type { NextApiRequest, NextApiResponse } from "next";
import { getCache, setCache } from "../../../lib/cache";

const TTL = Number(process.env.RU_CACHE_TTL || 60); // seconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cacheKey = "randomuser_profile";
    const cached = getCache(cacheKey);
    if (cached) return res.status(200).json(cached);

    // randomuser.me API - fetch 1 user
    const resp = await fetch(
      "https://randomuser.me/api/?inc=name,picture,email,location,phone,login&nat=us"
    );
    const data = await resp.json();

    setCache(cacheKey, data, TTL);
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
}
