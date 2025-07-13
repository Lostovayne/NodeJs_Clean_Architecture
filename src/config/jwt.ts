import jwt from "jsonwebtoken";
import { envs } from "./envs";

type Duration = "2h" | "1d" | "7d" | "30d";

export class JwtAdapter {
  static async generateToken(payload: Object, duration: Duration = "2h"): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token || null);
      });
    });
  }

  static validateToken(token: string): Promise<Object | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as Awaited<Promise<Object>>);
      });
    });
  }
}
