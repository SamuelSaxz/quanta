import { db, type DBOrTX } from "@db/index";

async function seed({ db }: { db: DBOrTX }) {
  console.log("\n 🌱 Seeding...");

  setTimeout(async () => {
    await db.transaction(async (tx) => {
      console.log("\n 🌱 Seeding done");
    });
  }, 3000);
}

seed({ db: db });
