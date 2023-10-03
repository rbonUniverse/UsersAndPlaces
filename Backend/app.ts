import express, { NextFunction, Request, Response } from "express";
import placesRoutes from "./src/routes/places-routes";
import usersRoutes from "./src/routes/users-routs";
import bodyParser from "body-parser";
import HTTPError from "./src/models/http-error";

interface CustomError extends Error {
  code?: number;
}

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HTTPError("Could not find route", 404);
  throw error;
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res
      .status(error.code || 500)
      .json({ message: error.message || "Unknown error occurred" });
  }
);

app.listen(5001, () => console.log(`Listening on http://localhost:${5001}`));
