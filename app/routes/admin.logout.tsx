import type { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/modules/auth.server'

export async function action({ request }: LoaderFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: '/',
  })
}