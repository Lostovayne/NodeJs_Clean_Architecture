import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    // Define your principal routes here
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
