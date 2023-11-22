import { NotFoundError, errorHandler } from "@ajay404/elevate";
import express, { Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import { startupRoute } from "./lib/controller/startup.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(morgan("dev"));

// routes
app.use("/api/v1/search/startup", startupRoute);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
