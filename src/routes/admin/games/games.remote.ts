import { db } from '$lib/server/database.js';
import { InstanceStatus, getInstance, resumeInstance, startInstance, stopInstance, minecraftServerOptions } from '$lib/server/gcp-compute.js';
import { addSubdomain, deleteSubdomain } from '$lib/server/porkbun.js';
import { gameServers } from '$lib/server/database.schema.js';
import { z } from "zod/v4";
import { getUserIfLoggedIn } from '$lib/utils/remote-functions.js';
import { eq } from 'drizzle-orm';
import { form, query } from '$app/server';

export const listGameServers = query(async () => {
  getUserIfLoggedIn();

  const allServers = await db.select().from(gameServers);
  return Promise.all(allServers.map(async (server) => {
    try {
      const vmInstance = await getInstance(server.instanceName);
      return {
        ...server,
        status: vmInstance.status as InstanceStatus,
        vmInstance,
      }
    } catch {
      return {
        ...server,
        status: InstanceStatus.Undefined,
        vmInstance: null,
      }
    }
  }));
})

export const getGameServer = query(z.string(), async (instanceName: string) => {
	getUserIfLoggedIn();

	const servers = await db.select().from(gameServers).where(eq(gameServers.instanceName, instanceName)).limit(1);
	if (servers.length > 0) {
		const vmInstance = await getInstance(servers[0].instanceName);
		return {
			...servers[0],
			status: vmInstance.status as InstanceStatus,
			vmInstance,
		}
	}
	return null;
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

  await listGameServers().refresh();
})

const newServerArgs = z.object({
	instanceName: z.string(),
	subdomain: z.string(),
	instanceConfig: z.object({
		machineType: z.string(),
	})
}).and(z.discriminatedUnion('game', [
	z.object({
		game: z.literal('minecraft'),
		options: minecraftServerOptions,
	}),
]))

export const createServer = form(async (data: FormData) => {
	getUserIfLoggedIn();

	const { game, instanceName, subdomain, options } = newServerArgs.parse(Object.fromEntries(data.entries()));

	switch (game) {
		case 'minecraft': {
			// Create the database entry

			// Create the GCP instance

		}
	}
})
