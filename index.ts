import { Server } from "@presentation/server.ts";
import { envs } from "@src/config/envs";

(() => {
  main();
})();

async function main() {
  new Server({
    port: envs.PORT,
  }).start();
}
  