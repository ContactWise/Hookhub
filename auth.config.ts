import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import path from "path";
import { promises as fs } from "fs";
import { signInSchema } from "./schemas/auth";

interface dBUser {
  id: number;
  email: string;
  password: string;
  role: string;
}

export default {
  providers: [
    Credentials({
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

        const user = data.users.find((u: dBUser) => u.email === email);

        if (!user) {
          throw new Error("User not found.");
        }
        if (user.password !== password) {
          throw new Error("Invalid password.");
        }

        console.log("user authentication successful", user);
        console.log("user found", user);
        if (!user) {
          throw new Error("User not found.");
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
