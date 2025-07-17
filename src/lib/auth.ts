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
      // If user is logged in, fetch isAdmin from the database

      if (!user.email) {
  // handle missing email (throw error or return early)
        throw new Error("Email is required");
      }
      if (user) {
        // Fetch user details from the database
        const dbUser = await prisma.profiles.findUnique({
          where: { email: user.email },
          select: { isAdmin: true }, // Select only isAdmin field
        });

        // Ensure the token has the expected shape
        token.firstname = user.firstname || null; 
        token.lastname = user.lastname || null;   
        token.image = user.image || null;        
        token.isAdmin = dbUser?.isAdmin || false; // Use fetched isAdmin value
      }
      return token as JWT & { // Extend the JWT type
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        isAdmin: boolean; // Add isAdmin to token type
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
