import { createCookieSessionStorage } from '@remix-run/node'
import {NODE_ENV, SESSION_SECRET} from "~/modules/constants.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [SESSION_SECRET],
    secure: NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage