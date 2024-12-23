import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //const token = req.cookies.get("access_token_cookie")?.value;

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  console.log("Cookies in middleware:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 驗證 token 是否存在
  // if (!token) {
  //   console.log("No token found, redirecting to Login Page");
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/chat", "/setting","/dashboard"],
};
