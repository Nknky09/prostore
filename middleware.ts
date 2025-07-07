import { edgeAuth } from "@/auth-edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await edgeAuth();

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const response = NextResponse.next();

  if (!request.cookies.get("sessionCartId")) {
    const newCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", newCartId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    console.log("sessionCartId cookie set:", newCartId);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|.*\\..*|api).*)"],
};
