import {Firestore} from '@google-cloud/firestore';
import type {TOTPData} from "remix-auth-totp";
import {GCP_CREDENTIALS, GCP_PROJECT_ID} from "~/modules/constants.server";

export const db = new Firestore({
  projectId: GCP_PROJECT_ID,
  credentials: JSON.parse(GCP_CREDENTIALS),
});

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T
})

export interface Admin {
  email: string;
}

export const adminCollection = db.collection('admin').withConverter(converter<Admin>());

export async function getAdmin(email: string) {
  console.error(GCP_PROJECT_ID);
  try {
    const record = await adminCollection.doc(email).get();
    console.error(record);
    return record.data() ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createAdmin(email: string) {
  await adminCollection.doc(email).set({ email });
}

export interface Totp extends TOTPData {
  expiresAt: Date;
}

export const totpCollection = db.collection('totp').withConverter(converter<Totp>());

export async function getTotp(hash: string) {
  const result = await totpCollection.doc(hash).get();
  return result.data() ?? null;
}

export async function createTotp(hash: string, data: Totp) {
  await totpCollection.doc(hash).set(data);
}

export async function updateTotp(hash: string, data: Partial<Omit<Totp, 'hash'>>) {
  await totpCollection.doc(hash).update(data);
}
