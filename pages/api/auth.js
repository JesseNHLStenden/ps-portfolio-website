import { pb } from "@/lib/pocketbase";

export const getToken = async (token) => {
  try {
    const record = await pb
      .collection("tokens")
      .getFirstListItem(`token="${token}"`);
    return !!record;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  const tokenExists = await getToken(token);

  return res.status(tokenExists ? 200 : 401).json({ success: tokenExists });
};

export default handler;
