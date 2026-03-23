import * as storage from "@google-cloud/storage";
import { GCP_CREDENTIALS, GCP_PROJECT_ID } from "$env/static/private";


const storageClient = new storage.Storage({
	projectId: GCP_PROJECT_ID,
	credentials: JSON.parse(GCP_CREDENTIALS),
})

export async function uploadFileToBucket(bucketName: string, destinationPath: string, file: File) {
	const bucket = storageClient.bucket(bucketName);
	const fileStream = bucket.file(destinationPath).createWriteStream();
	fileStream.end(file);
	await new Promise((resolve, reject) => {
		fileStream.on('finish', resolve);
		fileStream.on('error', reject);
	});

	return `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
}

