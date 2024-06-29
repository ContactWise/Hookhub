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
import authConfig from "@/auth.config";

interface dBUser {
  id: number;
  email: string;
  password: string;
  role: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session) {
        console.log("updating token", { token, session });
        token = { ...token, user: session };
        console.log("token updated", token);
        return token;
      }

      if (user) {
        console.log("user", user);
        token.role = user.role;
        const tenants = await getTenants();
        if (tenants.data.length > 0) {
          const firstTenantId = tenants.data[0].id;
          token.tenant = firstTenantId;
          const workspaces = await getWorkspaces(firstTenantId);
          token.workspace =
            workspaces.data.length > 0 ? workspaces.data[0].id : "";
        } else {
          token.tenant = "";
          token.workspace = "";
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.tenant = token.tenant;
      session.user.workspace = token.workspace;
      return session;
    },
  },
  ...authConfig,
});
