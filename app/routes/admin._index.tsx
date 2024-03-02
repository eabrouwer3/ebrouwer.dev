import type {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node'

import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth.server'
import {Card} from "~/components/Card";
import {DbGameServer, listGameServers} from "~/modules/db.server";
import {getInstance, resumeInstance, startInstance, stopInstance} from "~/modules/games.server";
import {addSubdomain, deleteSubdomain} from "~/modules/porkbun.server";

enum GameServerStatus {
  Deprovisioning = 'DEPROVISIONING',
  Provisioning = 'PROVISIONING',
  Repairing = 'REPAIRING',
  Running = 'RUNNING',
  Staging = 'STAGING',
  Stopped = 'STOPPED',
  Stopping = 'STOPPING',
  Suspended = 'SUSPENDED',
  Suspending = 'SUSPENDING',
  Terminated = 'TERMINATED',
  Undefined = 'UNDEFINED',
}

interface GameServer extends DbGameServer {
  status: GameServerStatus,
}

const GameServerCard: React.FC<GameServer> = ({name, game, subdomain, instanceName, status}) => {
  const redButton = <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop Server</button>
  const greenButton = <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start Server</button>
  const grayButton = <button className="bg-gray-400 hover:bg-gray500 text-white font-bold py-2 px-4 rounded" disabled>Bad State</button>

  const action = status === GameServerStatus.Running ? 'stop' : status === GameServerStatus.Stopped || status === GameServerStatus.Terminated ? 'start' : status === GameServerStatus.Suspended ? 'resume' : 'unknown';
  const button = action === 'stop' ? redButton : action === 'start' || action === 'resume' ? greenButton : grayButton;

  return (
    <Card title={`${name} (${game})`}>
      <p>
        This is a game server for "{game}" that is hosted at "{subdomain}.ebrouwer.dev". It has the instance name "{instanceName}".
      </p>
      <Form method='POST'>
        <input type="hidden" name="instanceName" value={instanceName} />
        <input type="hidden" name="subdomain" value={subdomain} />
        <input type="hidden" name="action" value={action} />
        {button}
      </Form>
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
      return { ...server, status: status as GameServerStatus } as GameServer;
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
  if (action === 'resume' || action === 'start') {
    // Start the game server
    if (action === 'resume') {
      await resumeInstance(instanceName.toString());
    } else {
      await startInstance(instanceName.toString());
    }
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
    throw new Error(`Invalid action: ${action}.`);
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