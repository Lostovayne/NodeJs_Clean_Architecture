import { Server } from "@presentation/server.ts";
import { envs } from "@src/config/envs";
import { AppRoutes } from "@src/presentation/routes";

(() => {
  main();
})();

async function main() {
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
