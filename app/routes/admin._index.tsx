import type {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node'

import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth.server'
import {Card} from "~/components/Card";
import {DbGameServer, listGameServers} from "~/modules/db.server";
import {getInstance, startInstance, stopInstance} from "~/modules/games.server";
import {addSubdomain, deleteSubdomain} from "~/modules/porkbun.server";

interface GameServer extends DbGameServer {
  status: 'running' | 'stopped' | 'unknown';
}

const GameServerCard: React.FC<GameServer> = ({name, game, subdomain, instanceName, status}) => {
  return (
    <Card title={`${name} (${game})`}>
      <p>
        This is a game server for "{game}" that is hosted at "{subdomain}.ebrouwer.dev". It has the instance name "{instanceName}".
      </p>
      {status === 'running' ? (
        <Form method='POST'>
          <input type="hidden" name="instanceName" value={instanceName} />
          <input type="hidden" name="subdomain" value={subdomain} />
          <input type="hidden" name="action" value="stop" />
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop Server</button>
        </Form>
      ) : null}
      {status === 'stopped' ? (
        <Form method='POST'>
          <input type="hidden" name="instanceName" value={instanceName} />
          <input type="hidden" name="subdomain" value={subdomain} />
          <input type="hidden" name="action" value="start" />
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start Server</button>
        </Form>
      ) : null}
      {status === 'unknown' ? (<p>Server status unknown...</p>) : null}
    </Card>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/admin/login',
  })
  const gameServers = await listGameServers();
  return json({ user, gameServers: await Promise.all(
    gameServers.map(async (server) => {
      const { status } = await getInstance(server.instanceName);
      const simpleStatus =
        status === 'RUNNING' ? 'running' :
          status === 'SUSPENDED' ? 'stopped' :
            'unknown';
      return { ...server, status: simpleStatus } as GameServer;
    }),
  ) });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action');
  const instanceName = formData.get('instanceName');
  const subdomain = formData.get('subdomain');
  if (!action || !instanceName || !subdomain) {
    throw new Error('Invalid form data.');
  }
  if (action === 'start') {
    // Start the game server
    await startInstance(instanceName.toString());
    const instance = await getInstance(instanceName.toString());
    const externalIp = instance.networkInterfaces?.flatMap(({accessConfigs}) => accessConfigs?.map(({natIP}) => natIP)).find(Boolean);
    if (!externalIp) {
      throw new Error('External IP not found.');
    }
    // Add the DNS record
    await addSubdomain(subdomain.toString(), externalIp);
  } else if (action === 'stop') {
    // Stop the game server
    await stopInstance(instanceName.toString());
    // Delete the DNS record
    await deleteSubdomain(subdomain.toString());
  } else {
    throw new Error('Invalid action.')
  }

  return json({ status: 'success' }, { status: 200 });
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
          {gameServers.map(({id, name, game, subdomain, instanceName, status}) => (
            <GameServerCard key={id} id={id} name={name} game={game} subdomain={subdomain} instanceName={instanceName} status={status} />
          ))}
        </div>
      </div>
    </>
  )
}