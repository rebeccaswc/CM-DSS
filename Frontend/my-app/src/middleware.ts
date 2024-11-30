import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //const accessToken = req.cookies.get("access_token")?.value;
  //console.log(accessToken)
  // if (!accessToken) {
  //   console.log("No access token found, redirecting to login.");
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/alert", "/chat", "/setting","/dashboard"],
};
