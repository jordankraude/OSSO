// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Ensure ID is included
    email: string;
    firstname: string | null; // Allow for null
    lastname: string | null;  // Allow for null
    image: string | null;     // Allow for null
    isAdmin: boolean;       // Optional admin status
  }

  interface Session {
    user: User;
  }
}


    // "postinstall": "cp ./types/bcryptjs.d.ts ./node_modules/bcryptjs/"