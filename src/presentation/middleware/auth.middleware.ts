import type { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  static validateJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log("JWT validation middleware triggered");

    next();
  };
}
