import { DefaultSession, DefaultUser } from "next-auth";

// Extend built-in types
declare module "next-auth" {
  interface Session {
    user: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      isAdmin: boolean;
      isVolunteerDirector?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
    isVolunteerDirector?: boolean;
    isAdmin: boolean;
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    firstname?: string | null;
    lastname?: string | null;
    image?: string | null;
    isVolunteerDirector?: boolean;
    isAdmin: boolean;
  }
}



    // "postinstall": "cp ./types/bcryptjs.d.ts ./node_modules/bcryptjs/"