import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/lib/utils";
import { signInSchema } from "./schemas/auth";
import path from "path";
import { promises as fs } from "fs";

interface dBUser {
  id: number;
  email: string;
  password: string;
  role: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "email:",
          type: "text",
        },
        password: {
          label: "password:",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const credsPath = path.join(process.cwd() + "/creds.json");
        const credsFile = await fs.readFile(credsPath, "utf8");
        const data = JSON.parse(credsFile);

        const { email, password } = await signInSchema.parseAsync(credentials);
        console.log("attempting to sign in with", email, password);

        // Assuming the creds.json structure is an array of user objects { email, password }
        const user = data.users.find((u: dBUser) => u.email === email);

        if (!user) {
          // User not found by email
          throw new Error("User not found.");
        }

        // Assuming a simple comparison for demonstration; in a real application, use secure password hashing
        if (user.password !== password) {
          // Password does not match
          throw new Error("Invalid password.");
        }

        console.log("user authentication successful", user);
        console.log("user found", user);
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
