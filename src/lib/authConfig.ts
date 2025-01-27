import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import { SessionStrategy } from "next-auth";
import { encode, decode } from "@/lib/webcrypto";
export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ): Promise<any | null> {
        if (!credentials) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        if (existingUser && existingUser.password === credentials.password) {
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
          };
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly cast to the correct type
  },
  jwt: {
    encode,
    decode,
  },
};
