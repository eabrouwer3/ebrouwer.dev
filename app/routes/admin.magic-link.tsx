import type { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/modules/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
  })
}