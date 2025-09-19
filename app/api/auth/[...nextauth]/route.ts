// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (credentials?.email === "admin@example.com" && credentials?.password === "admin@1234") {
//           return { id: "1", name: "Admin", email: "admin@example.com" };
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/signin",
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Centralized configuration for NextAuth.js.
// This object is used to configure all aspects of NextAuth.
export const authOptions: NextAuthOptions = {
  providers: [
    // Allows users to sign in with their Google accounts.
    // Requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Provides a traditional email/password sign-in form.
    // The `authorize` function contains the logic to validate user credentials.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a mock authentication. In a real application, you would validate
        // credentials against a database.
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin@1234"
        ) {
          // Returning a user object signs the user in.
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
            role: "admin",
          };
        }
        // Return null if credentials are not valid.
        return null;
      },
    }),
  ],

  // Custom pages for authentication.
  pages: {
    signIn: "/signin", // Redirects users to `/signin` for authentication.
  },

  // Callbacks are used to control what happens when an action is performed.
  callbacks: {
    // The JWT callback is invoked when a JSON Web Token is created or updated.
    async jwt({ token, user }) {
      // Persist the user's ID and role to the token after sign-in.
      if (user) {
        token.id = user.id || token.sub;
        token.role = user.role || "user";
      }
      return token;
    },

    // The session callback is called when a session is checked.
    async session({ session, token }) {
      // Pass the user's ID and role from the token to the session object.
      // This makes it available on the client-side.
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // A secret is required to sign the JWTs.
  // In production, this should be a strong, randomly generated string.
  secret: process.env.NEXTAUTH_SECRET,
};

// The handler exports GET and POST methods for the App Router.
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
