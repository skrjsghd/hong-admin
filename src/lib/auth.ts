import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { authConfig } from "./auth-config";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }
          const compare = await bcrypt.compare(
            password as string,
            user.password || "",
          );
          if (!compare) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
});
