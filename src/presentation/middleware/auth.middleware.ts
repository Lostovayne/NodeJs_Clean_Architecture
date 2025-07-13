import type { RequestHandler } from "express";

export class AuthMiddleware {
  // Express middleware implementation
  static validateJWT: RequestHandler = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized Not Valid Token" });
      return;
    }

    try {
      const token = authorization.split(" ")[1] || "";
      if (!req.body) req.body = {};
      req.body.token = token;

      next();
    } catch (error) {
      console.error("JWT validation error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
