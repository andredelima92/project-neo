import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes/";
import cors from "cors";
import AppError from "./errors/AppError";
import "./database";

import ManagerCron from "./manager-cron";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => {
  console.log("server is online on port 3333");

  new ManagerCron().run();
});
