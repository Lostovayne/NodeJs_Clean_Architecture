import { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import type { Request, Response } from "express";

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    return res.json("User registered successfully");
  };

  loginUser = (req: Request, res: Response) => {
    return res.json("User logged in successfully");
  };
}
