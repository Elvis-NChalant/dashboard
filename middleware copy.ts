// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("auth")?.value;
  console.log("middleware token");

  if (!token) {
    console.log("middleware token", req.cookies.getAll());
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply to routes that require auth
export const config = {
    matcher: "/landing", // protected paths
};

