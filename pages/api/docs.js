import { pb } from "@/lib/pocketbase";
import { getToken } from "./auth";

const getPsiItems = async () => {
  try {
    return await pb.collection("ps_items").getFullList({
      expand: "psDocs",
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  const tokenRecord = await getToken(token);

  if (!tokenRecord) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const psItems = await getPsiItems();

  return res.status(200).json({ psItems });
};

export default handler;
