import express, { NextFunction, Request, Response } from "express";
import placesRoutes from "./src/routes/places-routes";
import usersRoutes from "./src/routes/users-routes";
import HTTPError from "./src/models/http-error";
import bodyParser from "body-parser";
import config from "./util/config";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import cors from "cors";

interface CustomError extends Error {
  code?: number;
}

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((_req: Request, _res: Response, _next: NextFunction) => {
  const error = new HTTPError("Could not find route", 404);
  throw error;
});

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    if (res.headersSent) {
      return next(error);
    }
    res
      .status(error.code || 500)
      .json({ message: error.message || "Unknown error occurred" });
  }
);

mongoose
  .connect(config.connectionString)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Listening on http://localhost:${config.port}`),
        console.log("Connected to UsersAndPlaces mongodb Atlas");
    });
  })
  .catch((error) => {
    console.log(error);
  });
