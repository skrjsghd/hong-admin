import { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { prisma } from "./prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        if (nextUrl.pathname === "/") {
          return Response.redirect(new URL("/table", nextUrl.origin));
        }
        return true;
      } else {
        if (nextUrl.pathname.startsWith("/register")) {
          return true;
        }
        if (nextUrl.pathname !== "/login") {
          return Response.redirect(new URL("/login", nextUrl.origin));
        }
      }
      return true;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub || "",
        },
      };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
