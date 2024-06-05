import { NextResponse } from "next/server";
import { pb } from "@/lib/pocketbase";

export async function middleware(req) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token");


  // redirect to the homepage if no token is provided
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const record = await pb
      .collection("tokens")
      .getFirstListItem(`token="${token}"`);

    if (record) {
      return NextResponse.next();
    }
  } catch (error) {
  }

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: "/docs/:path*",
};
