import {Authenticator, AuthorizationError} from 'remix-auth'
import { TOTPStrategy } from 'remix-auth-totp'

import { sessionStorage } from '~/modules/session.server'
import { sendAuthEmail } from '~/modules/email.server'
import type {Admin} from '~/modules/db.server';
import { createTotp, getAdmin, getTotp, updateTotp} from '~/modules/db.server'
import {ENCRYPTION_SECRET} from "~/modules/constants.server";

const authenticator = new Authenticator<Admin>(sessionStorage, {
  throwOnError: true,
});

authenticator.use(
  new TOTPStrategy(
    {
      secret: ENCRYPTION_SECRET,
      magicLinkGeneration: { callbackPath: '/admin/magic-link' },

      createTOTP: async (data, expiresAt) => {
        await createTotp(data.hash, { ...data, expiresAt });
      },
      readTOTP: getTotp,
      updateTOTP: async (hash, data, expiresAt) => {
        await updateTotp(hash, { ...data, expiresAt });
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        await sendAuthEmail({ email, code, magicLink });
      },
    },
    async ({ email }) => {
      const admin = await getAdmin(email);
      if (!admin) {
        throw new AuthorizationError('Invalid email address');
      }
      return admin;
    },
  ),
);

export { authenticator };
