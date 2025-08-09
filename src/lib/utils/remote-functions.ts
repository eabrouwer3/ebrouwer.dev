import { getRequestEvent } from "$app/server";
import { redirect } from "@sveltejs/kit";

export function getUserIfLoggedIn() {
  const { locals } = getRequestEvent();
  const { session, user } = locals;

  if (!session) {
    redirect(307, "/login");
  }

  return user;
}
