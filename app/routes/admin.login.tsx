import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { authenticator } from '~/modules/auth.server'
import { getSession, commitSession } from '~/modules/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/admin',
  })

  const cookie = await getSession(request.headers.get('Cookie'))
  const authEmail = cookie.get('auth:email')
  const authError = cookie.get(authenticator.sessionErrorKey)

  // Commit session to clear any `flash` error message.
  return json(
    { authEmail, authError },
    {
      headers: {
        'set-cookie': await commitSession(cookie),
      },
    },
  )
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/admin/login',
    failureRedirect: '/admin/login',
  })
}

export default function Login() {
  const { authError } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex pb-6 pt-12">
        <div className="flex flex-col justify-center grow">
          <h1 className="font-header text-4xl tracking-widest block">Admin Login</h1>
        </div>
      </div>
      <div className="flex">
        <div className="grow">
          {/* Email Form. */}
          <Form method="POST">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm" htmlFor="email">Email</label>
              </div>
              <div>
                <input type="email" name="email" placeholder="Insert email..." required className="form-input rounded w-full lg:w-1/2" />
              </div>
              <div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send Code</button>
              </div>
            </div>
          </Form>

          {/* Code Verification Form. */}
          <Form method="POST">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm" htmlFor="code">Code</label>
              </div>
              <div>
                <input type="text" name="code" placeholder="Insert code..." required className="form-input rounded w-full lg:w-1/2" />
              </div>
              <div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Continue</button>
              </div>
            </div>
          </Form>

          {/* Renders the error message. */}
          <div className="flex flex-col gap-3">
            {authError && <div>{authError.message}</div>}
          </div>
        </div>
      </div>
    </>
  )
}