import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect authenticated users from /signin to /dashboard
    if (req.nextUrl.pathname === "/signin" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect dashboard and other protected routes
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Protect posts and other protected routes
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/posts")) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Protect users and other protected routes
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Protect profile and other protected routes
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to /signin if not authenticated
        if (req.nextUrl.pathname === "/signin") {
          return true;
        }
        // Allow access to API routes for authentication
        if (req.nextUrl.pathname.startsWith("/api/auth")) {
          return true;
        }
        // All other routes require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/posts/:path*", "/users/:path*", "/profile/:path*", "/signin"],
};
