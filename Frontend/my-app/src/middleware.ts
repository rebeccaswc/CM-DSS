import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Cookies in middleware:", req.cookies);
  const token = req.cookies.get("access_token_cookie")?.value;

  // 驗證 token 是否存在
  if (!token) {
    console.log("No token found, redirecting to Login Page");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/chat", "/setting","/dashboard"],
};
