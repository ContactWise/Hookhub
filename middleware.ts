import { NextResponse, NextRequest } from "next/server";
// import { auth } from "./auth";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthRoutes,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

const redirects: Record<string, RedirectEntry> = {
  "/dashboard": {
    destination: "/dashboard/applications",
    permanent: true,
  },
  "/dashboard/application": {
    destination: "/dashboard/applications",
    permanent: true,
  },
};

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const pathName = nextUrl.pathname;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutes);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow all users to access api routes
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  const redirectData = redirects[pathName];
  if (isLoggedIn && redirectData) {
    const statusCode = redirectData.permanent ? 308 : 307;
    return NextResponse.redirect(
      new URL(redirectData.destination, req.url),
      statusCode
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
