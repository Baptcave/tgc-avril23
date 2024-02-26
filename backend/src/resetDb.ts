import db, { clearDB } from "./db";

export default async function main() {
  await db.initialize();
  await clearDB();
  await db.synchronize();

  // TODO

  await db.destroy();
  console.log("done !");
}

main();
