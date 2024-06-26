import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/lib/utils";
import { signInSchema } from "./schemas/auth";
import path from "path";
import { promises as fs } from "fs";
import { getWorkspaces } from "./actions/workspaces";
import { User } from "lucide-react";
import { getTenants } from "./actions/tenants";

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
    jwt: async ({ token, user, trigger, session }) => {
      // If the trigger is "update", update the token and return immediately
      if (trigger === "update" && session) {
        // Update the token as needed based on the session or other logic
        console.log;
        token = { ...token, user: session /* other fields as needed */ };
        console.log("token updated", token);
        return token;
      }

      // Proceed with fetching tenants and workspaces only if the trigger is not "update"
      if (user) {
        console.log("user", user);
        token.role = user.role;
        const tenants = await getTenants();
        if (tenants.data.length > 0) {
          const firstTenantId = tenants.data[0].id;
          token.tenant = firstTenantId; // Set the first tenant's ID

          // Fetch workspaces using the first tenant's ID
          const workspaces = await getWorkspaces(firstTenantId);
          console.log("tenants fetched", tenants);
          console.log("workspaces fetched", workspaces);
          token.workspace =
            workspaces.data.length > 0 ? workspaces.data[0].id : ""; // Assuming each workspace has an id
        } else {
          token.tenant = "";
          token.workspace = "";
        }
      }
      console.log("initial token", token);
      // Return the token with any updates made during this function call
      return token;
    },
    session({ session, token }) {
      console.log("token from session", token);
      session.user.role = token.role;
      session.user.tenant = token.tenant;
      session.user.workspace = token.workspace;
      return session;
    },
  },
});

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  tenant: string;
  workspace: string;
}
