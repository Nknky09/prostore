import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

// No PrismaAdapter here!
const edgeConfig = {
  session: { strategy: "jwt" },
  providers: [],
} satisfies NextAuthConfig;

export const { auth: edgeAuth } = NextAuth(edgeConfig);
