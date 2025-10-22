import type { NextApiRequest, NextApiResponse } from "next";
import { getCache, setCache } from "../../../lib/cache";

const TTL = Number(process.env.RU_CACHE_TTL || 30);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { results = "12" } = req.query;
    const key = `randomuser_users_${results}`;
    const cached = getCache(key);
    if (cached) return res.status(200).json(cached);

    const resp = await fetch(
      `https://randomuser.me/api/?results=${encodeURIComponent(
        String(results)
      )}&inc=name,picture,location,email,login,phone&nat=us`
    );
    const data = await resp.json();

    setCache(key, data, TTL);
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
