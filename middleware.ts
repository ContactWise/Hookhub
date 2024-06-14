import { NextResponse, NextRequest } from "next/server";

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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const redirectData = redirects[pathname];

  if (redirectData) {
    const statusCode = redirectData.permanent ? 308 : 307;
    return NextResponse.redirect(
      new URL(redirectData.destination, request.url)
    );
  }

  // No redirect found, continue without redirecting
  return NextResponse.next();
}
