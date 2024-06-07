import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (!request?.cookies?.has("authenticated"))
      request.cookies.set("authenticated", "false"); //no auth cookie

    if (
      Boolean(request?.cookies?.get("authenticated")?.value) &&
      request.cookies.has("user_id")
    )
      return NextResponse.redirect(new URL("/dashboard", request.url)); //authenticated and has user_id
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!request.cookies.has("user_id"))
      return NextResponse.redirect(new URL("/login", request.url)); //user cookie not found

    if (!Boolean(request?.cookies?.get("authenticated")?.value)) {
      //not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!request?.cookies?.has("authenticated")) {
      //no auth cookie found
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/login",
  ],
};
