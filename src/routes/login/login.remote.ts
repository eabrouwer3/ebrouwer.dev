import { form, getRequestEvent } from "$app/server";
import { auth } from "$lib/server/auth.js";
import { APIError } from "better-call";

export const loginForm = form(async (formData: FormData) => {
  const email = formData.get('email');
  if (!email) {
    return {
      error: 'Email is required',
    }
  }

  const { request: { headers } } = getRequestEvent();

  try {
    await auth.api.signInMagicLink({
      body: {
        email: email.toString(),
        callbackURL: '/admin',
        errorCallbackURL: '/login',
      },
      headers,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return {
        error: error.body?.message,
      };
    }
    return {
      error: 'Failed to send magic link',
    }
  }
  return {
    success: true,
  };
})
