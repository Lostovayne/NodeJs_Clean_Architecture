import { UserModel } from "@src/data/mongodb/models/user.mode";
import { LoginUserDto } from "@src/domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import { CustomError } from "@src/domain/errors/custom.error";
import type { AuthRepository } from "@src/domain/repositories/auth.repository";
import { LoginUserUseCaseImpl } from "@src/domain/use-cases/auth/login-user.use-case";
import { RegisterUserUseCaseImpl } from "@src/domain/use-cases/auth/register-user.use-case";
import type { Request, Response, RequestHandler } from "express";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response): void => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.log("Unhandled error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  registerUser: RequestHandler = (req: Request, res: Response): void => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    const registerUser = new RegisterUserUseCaseImpl(this.authRepository);

    if (error) {
      res.status(400).json({ error });
      return;
    }
    if (!registerUserDto) {
      res.status(400).json({ error: "Invalid user data" });
      return;
    }

    registerUser
      .execute(registerUserDto)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser: RequestHandler = (req: Request, res: Response): void => {
    // Dto -> Use Case
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    const loginUser = new LoginUserUseCaseImpl(this.authRepository);

    if (error) {
      res.status(400).json({ error });
      return;
    }
    if (!loginUserDto) {
      res.status(400).json({ error: "Invalid login data" });
      return;
    }

    loginUser
      .execute(loginUserDto)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers: RequestHandler = (req: Request, res: Response): void => {
    UserModel.find()
      .then((users) => res.json({ users, user: req.body.user }))
      .catch((error) => this.handleError(error, res));
  };
}
