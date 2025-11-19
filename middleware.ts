import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect authenticated users from /signin to /dashboard
    if (pathname === "/signin" && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow unauthenticated users to access /signin and /api/auth routes
    if (pathname === "/signin" || pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // Check if user is authenticated for all other routes
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to signin page and auth API routes
        if (pathname === "/signin" || pathname.startsWith("/api/auth")) {
          return true;
        }

        // Require authentication for all other routes
        return !!token;
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the following:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * *.svg, *.png, etc. (static assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
