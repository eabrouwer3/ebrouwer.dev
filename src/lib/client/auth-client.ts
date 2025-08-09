import { createAuthClient } from "better-auth/svelte";
import { magicLinkClient } from "better-auth/client/plugins";
import { PUBLIC_HOSTNAME } from "$env/static/public";

export const authClient = createAuthClient({
  baseURL: PUBLIC_HOSTNAME,
  plugins: [
    magicLinkClient(),
  ]
});
