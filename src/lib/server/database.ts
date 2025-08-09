import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import {
  gameServers,
  type GameServer,
  type NewGameServer,
} from './database.schema.js';
import { DATABASE_URL } from '$env/static/private';

export const db = drizzle(DATABASE_URL);

// Game server management functions
export async function getGameServer(id: string): Promise<GameServer | null> {
  const result = await db.select().from(gameServers).where(eq(gameServers.id, id)).limit(1);
  return result[0] || null;
}

export async function createGameServer(data: NewGameServer): Promise<GameServer> {
  const result = await db.insert(gameServers).values(data).returning();
  return result[0];
}

export async function listGameServers(): Promise<GameServer[]> {
  return await db.select().from(gameServers);
}

export async function updateGameServer(id: string, data: Partial<NewGameServer>): Promise<GameServer | null> {
  const result = await db.update(gameServers)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(gameServers.id, id))
    .returning();
  return result[0] || null;
}

export async function deleteGameServer(id: string) {
  await db.delete(gameServers).where(eq(gameServers.id, id));
}
