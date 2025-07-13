import { JwtAdapter } from "@src/config/jwt";
import { UserModel } from "@src/data/mongodb/models/user.mode";
import { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import { CustomError } from "@src/domain/errors/custom.error";
import type { AuthRepository } from "@src/domain/repositories/auth.repository";
import type { Request, Response } from "express";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response): void => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  };

  registerUser = (req: Request, res: Response): void => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    if (!registerUserDto) {
      res.status(400).json({ error: "Invalid user data" });
      return;
    }

    this.authRepository
      .register(registerUserDto)
      .then(async (user) =>
        res.json({ user, token: await JwtAdapter.generateToken({ id: user.id }) })
      )
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response): void => {
    res.json("User logged in successfully");
  };

  getUsers = (req: Request, res: Response): void => {
    UserModel.find()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };
}
