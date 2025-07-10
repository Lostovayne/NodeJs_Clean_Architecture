import { AuthDataSourceImpl } from "@src/infrastructure/data/auth.datasource.impl";
import { AuthRepositoryImpl } from "@src/infrastructure/repositories/auth.repository.impl";
import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const controller = new AuthController(authRepository);

    // Define your principal routes here
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
