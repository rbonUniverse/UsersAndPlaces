import express, { NextFunction, Request, Response } from "express";
import placesRoutes from "./routes/places-routes";
import bodyParser from "body-parser";

interface CustomError extends Error {
  code?: number;
}

const app = express();

app.use("/api/places", placesRoutes);

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
