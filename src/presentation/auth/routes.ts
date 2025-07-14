import { AuthDataSourceImpl } from "@src/infrastructure/datasource/auth.datasource.impl";
import { AuthRepositoryImpl } from "@src/infrastructure/repositories/auth.repository.impl";
import { Router } from "express";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const controller = new AuthController(authRepository);

    // Define your principal routes here
    router.get("/", AuthMiddleware.validateJWT, controller.getUsers);
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
