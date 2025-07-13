import { JwtAdapter } from "@src/config/jwt";
import { UserModel } from "@src/data/mongodb/models/user.mode";
import type { RequestHandler } from "express";

export class AuthMiddleware {
  // Express middleware implementation
  static validateJWT: RequestHandler = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized Not Valid Token" });
      return;
    }

    try {
      const token = authorization.split(" ")[1] || "";
      if (!req.body) req.body = {};

      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        res.status(401).json({ error: "Unauthorized Invalid Token" });
        return;
      }

      // Check if the user exists
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ error: "Unauthorized User Not Found" });
        return;
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.error("JWT validation error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
