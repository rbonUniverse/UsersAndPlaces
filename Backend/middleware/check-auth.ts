import { Request, Response, NextFunction } from "express";
import HTTPError from "../src/models/http-error";
import jwt from "jsonwebtoken";

const secretKey = "ururt_sfdsfsfdsf_";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken: any = jwt.verify(token, secretKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err: any) {
    const error = new HTTPError("Authentication failed!", 401);
    next(error);
  }
};

export default checkAuth;
