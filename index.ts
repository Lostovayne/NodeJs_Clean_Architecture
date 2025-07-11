import { Server } from "@presentation/server.ts";
import { envs } from "@src/config/envs";
import { MongoDatabase } from "@src/data/mongodb";
import { AppRoutes } from "@src/presentation/routes";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
