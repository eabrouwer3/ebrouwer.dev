import { query } from "$app/server";
import { getUserIfLoggedIn } from "$lib/utils/remote-functions.js";

export const getUser = query(async () => {
  return getUserIfLoggedIn();
});
