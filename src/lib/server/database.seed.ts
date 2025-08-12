import { db } from "./database.js";
import { gameServers, user } from "./database.schema.js";

async function seedFirstAdmin() {
  const FIRST_ADMIN: typeof user.$inferInsert = {
    id: "1",
    name: "Ethan Brouwer",
    email: "me@ebrouwer.dev",
    emailVerified: true,
    image: "https://avatars.githubusercontent.com/u/1647525?v=4",
  }

  await db.insert(user).values(FIRST_ADMIN).onConflictDoUpdate({
    target: [user.email],
    set: FIRST_ADMIN,
  });

  console.log("First admin seeded successfully");
}

async function seedGameServers() {
  const GAME_SERVERS: typeof gameServers.$inferInsert[] = [
    {
      id: 'hc9-server',
      instanceName: 'hc9-server',
      name: 'Hermitcraft Season 9',
      subdomain: 'hc9',
      game: 'Minecraft',
    },
    {
      id: 'kaitlyn-solo-server',
      instanceName: 'kaitlyn-solo-server',
      name: 'Kaitlyn Solo',
      subdomain: 'ksolo',
      game: 'Minecraft',
    },
  ];

  // NOTE: We can't update the game servers from here
  await db.insert(gameServers).values(GAME_SERVERS).onConflictDoNothing();
  console.log("Game servers seeded successfully");
}

async function main() {
  await seedFirstAdmin();
  await seedGameServers();
}

main().then(() => process.exit(0));
