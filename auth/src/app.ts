import { NotFoundError, errorHandler } from "@ajay404/elevate";
import express, { Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import { authRoute } from "./lib/controllers/auth.controller";
import { profileRoute } from "./lib/controllers/profile.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/profile", profileRoute);

app.all("*", async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;
