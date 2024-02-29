import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth.server'
import {Card} from "~/components/Card";
import {listGameServers} from "~/modules/db.server";

interface GameServerProps {
  name: string,
  game: string,
  subdomain: string,
}

const GameServerCard: React.FC<React.HTMLProps<HTMLDivElement> & GameServerProps> = ({name, game, subdomain, children}) => {
  const linkInfo = {
    type: 'external' as const,
    href: `${subdomain}.ebrouwer.dev`,
    text: 'Server Domain',
  };
  return (
      <Card title={`${name} (${game})`} link={linkInfo}>
        {children}
      </Card>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    // failureRedirect: '/admin/login',
  })
  const gameServers = await listGameServers();
  return json({ user, gameServers });
}

export default function Account() {
  const { user, gameServers } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex pb-6 pt-12">
        <div className="flex flex-col justify-center grow">
          <h1 className="font-header text-4xl tracking-widest block">Admin ({user && user.email})</h1>
        </div>
        <div className="flex flex-col shrink">
          {/* Logout Form. */}
          <Form action="/admin/logout" method="POST">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Log out</button>
          </Form>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grow">
          {gameServers.map(({id, name, game, subdomain}) => (
            <GameServerCard key={id} name={name} game={game} subdomain={subdomain} />
          ))}
        </div>
      </div>
    </>
  )
}