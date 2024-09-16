import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token_cookie")?.value;

  // 驗證 token 是否存在
  if (!token) {
    console.log("No token found, redirecting to Login Page");
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Home", "/Chat", "/Setting","/Dashboard"], // 要套用 middleware 的 router
};
