import { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import type { AuthRepository } from "@src/domain/repositories/auth.repository";
import type { Request, Response } from "express";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

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
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  };

  loginUser = (req: Request, res: Response): void => {
    res.json("User logged in successfully");
  };
}
