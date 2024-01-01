import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/admin/login',
  })
  return json({ user })
}

export default function Account() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>{user && `Welcome ${user.email}`}</h1>
      <Form action="/admin/logout" method="POST">
        <button>Log out</button>
      </Form>
    </div>
  )
}