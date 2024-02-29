import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth.server'
import {Card} from "~/components/Card";
import {GameServer, listGameServers} from "~/modules/db.server";

const GameServerCard: React.FC<GameServer> = ({name, game, subdomain, instanceId}) => {
  const linkInfo = {
    type: 'external' as const,
    href: `${subdomain}.ebrouwer.dev`,
    text: 'Server Domain',
  };
  return (
      <Card title={`${name} (${game})`} link={linkInfo}>
        <p>
          This is a game server for {game} that is hosted at {subdomain}.ebrouwer.dev. It has instance ID {instanceId}.
        </p>
      </Card>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/admin/login',
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
          <h1 className="font-header text-4xl tracking-widest block">Admin ({user.email})</h1>
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
          {gameServers.map(({id, name, game, subdomain, instanceId}) => (
            <GameServerCard key={id} name={name} game={game} subdomain={subdomain} instanceId={instanceId} />
          ))}
        </div>
      </div>
    </>
  )
}