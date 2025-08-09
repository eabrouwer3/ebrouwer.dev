import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "./database.js";
import { sendAuthEmail } from "./email.js";
import * as schema from "./database.schema.js";
import { getRequestEvent } from "$app/server";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { PUBLIC_HOSTNAME } from "$env/static/public";

export const auth = betterAuth({
  appName: "ebrouwer.dev",

  baseURL: PUBLIC_HOSTNAME,

  // Use PostgreSQL with Drizzle adapter
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    }
  }),

  // Disable password authentication - we only use magic links
  emailAndPassword: {
    enabled: false,
  },

  // Magic link plugin
  plugins: [
    sveltekitCookies(getRequestEvent),
    magicLink({
      sendMagicLink: sendAuthEmail,
      disableSignUp: true,
    }),
  ],
});
