import { NotFoundError, errorHandler } from "@ajay404/elevate";
import express, { Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import { investorRoute } from "./lib/controllers/investor.controller";
import cors from "cors";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

// routes
app.use("/api/v1/investor", investorRoute);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
