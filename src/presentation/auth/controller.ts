import type { Request, Response } from "express";

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json("User registered successfully");
  };

  loginUser = (req: Request, res: Response) => {
    res.json("User logged in successfully");
  };
}
