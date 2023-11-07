import { Request, Response, NextFunction } from "express";
import HTTPError from "../src/models/http-error";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userData: { userId: string };
    }
  }
}

const checkAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (
    req.method === "POST" ||
    req.method === "PATCH" ||
    req.method === "DELETE"
  ) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Authentication failed!");
      }
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as JwtPayload;
      req.userData = { userId: decodedToken.userId };
      next();
    } catch (err: any) {
      const error = new HTTPError("Authentication failed!", 401);
      next(error);
    }
  }
};

export default checkAuth;
