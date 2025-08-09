import { db } from '$lib/server/database.js';
import { GameServerStatus, getInstance, resumeInstance, startInstance, stopInstance } from '$lib/server/games.js';
import { addSubdomain, deleteSubdomain } from '$lib/server/porkbun.js';
import { gameServers } from '$lib/server/database.schema.js';
import { z } from "zod/v4";
import { getUserIfLoggedIn } from '$lib/utils/remote-functions.js';
import { form, query } from '$app/server';

export const listGameServers = query(async () => {
  getUserIfLoggedIn();

  const allServers = await db.select().from(gameServers);
  return Promise.all(allServers.map(async (server) => {
    try {
      const vmInstance = await getInstance(server.instanceName);
      return {
        ...server,
        status: vmInstance.status as GameServerStatus,
        vmInstance,
      }
    } catch (error) {
      return {
        ...server,
        status: GameServerStatus.Undefined,
        vmInstance: null,
      }
    }
  }));
})

const manageServerArgs = z.object({
  instanceName: z.string(),
  subdomain: z.string(),
  action: z.enum(['start', 'stop', 'resume']),
});

export const manageServer = form(async (data: FormData) => {
  getUserIfLoggedIn();

  const { instanceName, subdomain, action } = manageServerArgs.parse(Object.fromEntries(data.entries()));

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
  }

  listGameServers().refresh();
})
