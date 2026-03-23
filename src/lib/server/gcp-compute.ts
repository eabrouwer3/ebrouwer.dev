import compute from "@google-cloud/compute";
import { GoogleAuth } from 'google-auth-library';
import { GCP_CREDENTIALS, GCP_PROJECT_ID, GCP_ZONE, GCP_LOCATION } from "$env/static/private";
import { z } from 'zod/v4';
import { uploadFileToBucket } from '$lib/server/gcp-storage';
import crypto from 'node:crypto';

export enum InstanceStatus {
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

const auth = new GoogleAuth({
	credentials: JSON.parse(GCP_CREDENTIALS),
	scopes: ['https://www.googleapis.com/auth/cloud-platform'],
})

const instancesClient = new compute.InstancesClient({
  projectId: GCP_PROJECT_ID,
  credentials: JSON.parse(GCP_CREDENTIALS),
});

const operationsClient = new compute.ZoneOperationsClient({
  projectId: GCP_PROJECT_ID,
  credentials: JSON.parse(GCP_CREDENTIALS),
});

export async function getInstance(instanceName: string) {
  const [response] = await instancesClient.get({
    project: GCP_PROJECT_ID,
    instance: instanceName,
    zone: GCP_ZONE,
  });
  return response;
}

export async function stopInstance(instanceName: string) {
  const [response] = await instancesClient.suspend({
    project: GCP_PROJECT_ID,
    instance: instanceName,
    zone: GCP_ZONE,
  });
  let operation = response.latestResponse;

  // @ts-ignore
  while (operation.status !== 'DONE') {
    // @ts-ignore
    [operation] = await operationsClient.wait({
      project: GCP_PROJECT_ID,
      operation: operation.name,
      zone: GCP_ZONE,
    });
  }
}

export async function resumeInstance(instanceName: string) {
  const [response] = await instancesClient.resume({
    project: GCP_PROJECT_ID,
    instance: instanceName,
    zone: GCP_ZONE,
  });
  let operation = response.latestResponse;

  // @ts-ignore
  while (operation.status !== 'DONE') {
    // @ts-ignore
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: GCP_PROJECT_ID,
      zone: GCP_ZONE,
    });
  }
}

export async function startInstance(instanceName: string) {
  const [response] = await instancesClient.start({
    project: GCP_PROJECT_ID,
    instance: instanceName,
    zone: GCP_ZONE,
  });
  let operation = response.latestResponse;

  // @ts-ignore
  while (operation.status !== 'DONE') {
    // @ts-ignore
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: GCP_PROJECT_ID,
      zone: GCP_ZONE,
    });
  }
}

export const minecraftServerOptions = z.object({
	type: z.enum(['VANILLA', 'PAPER', 'FABRIC', 'FORGE']).default('PAPER'),
	version: z.string().default('latest'),
	motd: z.string().max(59).optional(),
	difficulty: z.enum(['peaceful', 'easy', 'normal', 'hard']).default('hard'),
	icon: z.url().optional(),
	maxPlayers: z.int().min(1).max(20),
	maxWorldSize: z.int().min(1).max(100_000).optional(),
	enableCommandBlock: z.boolean().default(false),
	hardcore: z.boolean().default(false),
	viewDistance: z.int().min(1).max(16).optional(),
	seed: z.string().optional(),
	mode: z.enum(['survival', 'creative', 'adventure', 'spectator']).default('survival'),
	pvp: z.boolean().default(true),
	levelType: z.enum(['normal', 'flat', 'large_biomes', 'amplified', 'single_biome_surface']).default('normal'),
	generatorSettings: z.json().optional(),
	serverName: z.string().optional(),
	ops: z.string().array().optional(),
	initialWhitelist: z.string().array().optional(),
	mods: z.string().array().optional(),
	resourcePackZip: z.file().mime('application/zip').optional(),
	datapacksZip: z.file().mime('application/zip').optional(),
	vanillaTweaksSharecode: z.string().optional(),
})

type MinecraftServerOptions = z.infer<typeof minecraftServerOptions>;

export async function createOrUpdateMinecraftInstance(
	instanceName: string,
	instanceType: string,
	options: MinecraftServerOptions,
	useSpotInstances: boolean = true,
) {
	// Upload any zip files to gcp storage and get the urls and shas
	let resourcePackUrl: string | undefined;
	let resourcePackSha: string | undefined;
	if (options.resourcePackZip) {
		resourcePackUrl = await uploadFileToBucket('ebrouwer-dev-cdn', `${instanceName}/resource-pack.zip`, options.resourcePackZip);
		const hash = crypto.createHash('sha256');
		hash.update(Buffer.from(await options.resourcePackZip.arrayBuffer()));
		resourcePackSha = hash.digest('hex');
	}

	let datapacksUrl: string | undefined;
	if (options.datapacksZip) {
		datapacksUrl = await uploadFileToBucket('ebrouwer-dev-cdn', `${instanceName}/datapacks.zip`, options.datapacksZip);
	}

	// Create the infra manager deployment
	const postResponse = await fetch(
		`https://config.googleapis.com/v1/projects/${GCP_PROJECT_ID}/locations/${GCP_LOCATION}/deployments?deploymentId=${instanceName}`,
		{
			method: 'POST',
			body: JSON.stringify({
				terraformBlueprint: {
					inputValues: {
						instanceName,
						instanceType,
						useSpotInstances,
						...options,
						resourcePackUrl,
						resourcePackSha,
						datapacksUrl,
					},
					gitSource: {
						repo: 'https://github.com/eabrower3/ebrouwer.dev.git',
						ref: 'sveltekit',
						directory: 'terraform/minecraft-server',
					},
				}
			}),
		}
	)
	if (!postResponse.ok) {

	}
}
