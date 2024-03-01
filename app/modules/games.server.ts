import compute from "@google-cloud/compute";
import {GCP_CREDENTIALS, GCP_PROJECT_ID} from "~/modules/constants.server";

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
    instance: instanceName,
  });
  return response;
}

export async function stopInstance(instanceName: string) {
  const [response] = await instancesClient.suspend({
    instance: instanceName,
  });
  let [operation] = await response.promise();

  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
    });
  }
}

export async function startInstance(instanceName: string) {
  const [response] = await instancesClient.resume({
    instance: instanceName,
  });
  let [operation] = await response.promise();

  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
    });
  }
}