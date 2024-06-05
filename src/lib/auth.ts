import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
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
  callbacks: {
    async session({ session, token }) {
      const userSetting = await prisma.setting.findUnique({
        where: {
          userId: token.sub as string,
        },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub || "",
          connectionString: userSetting?.connectionUri,
        },
      };
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      connectionString: string | null;
    } & DefaultSession["user"];
  }
}
