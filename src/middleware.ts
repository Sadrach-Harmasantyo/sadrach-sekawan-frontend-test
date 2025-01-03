import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  console.log("token", token);

  // Redirect to login if no token
  if (!token && token === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Specify paths where the middleware should apply
export const config = {
  matcher: ["/"], // Add paths to protect
};
