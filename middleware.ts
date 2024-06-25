import { NextResponse, NextRequest } from "next/server";
import { auth } from "./auth";

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

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("in middleware");
  const pathname = request.nextUrl.pathname;
  console.log("session", session);
  // Redirect logged-in users trying to visit /auth/signin to /dashboard
  if (session && pathname === "/auth/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect users without a session trying to access any path other than /auth/signin to /auth/signin
  if (!session && pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Handle predefined redirects for logged-in users
  const redirectData = redirects[pathname];
  if (session?.user && redirectData) {
    const statusCode = redirectData.permanent ? 308 : 307;
    return NextResponse.redirect(
      new URL(redirectData.destination, request.url),
      statusCode
    );
  }

  // No redirect necessary, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
