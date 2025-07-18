import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: (profile) => {
        return {
          id: profile.id,
          email: profile.email,
          firstname: profile.given_name || null,
          lastname: profile.family_name || null,
          image: profile.picture || null,
          isAdmin: false,  // Provide a default here to satisfy TS
        };
      },

    }),
    // Add other providers as needed
  ],
  callbacks: {

async jwt({ token, user }) {
  if (user) {
    if (!user.email) {
      throw new Error("Email is required");
    }

    // Fetch user details from DB only on initial sign-in
    const dbUser = await prisma.profiles.findUnique({
      where: { email: user.email },
      select: { isAdmin: true },
    });

    token.firstname = user.firstname || null;
    token.lastname = user.lastname || null;
    token.image = user.image || null;
    token.isAdmin = dbUser?.isAdmin || false;
  }
  // On subsequent calls, user is undefined and we just return the existing token
  return token as JWT & {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
    isAdmin: boolean;
  };


    },
    async session({ session, token }) {
      // Ensure that token properties are correctly assigned
      session.user.firstname = (token.firstname as string | null) || null; 
      session.user.lastname = (token.lastname as string | null) || null;   
      session.user.image = (token.image as string | null) || null; 
      session.user.isAdmin = (token.isAdmin as boolean) || false; // Assign isAdmin to session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
