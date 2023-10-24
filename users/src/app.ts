import { NotFoundError, errorHandler } from "@ajay404/elevate";
import express, { Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import cookieSession from "cookie-session";
import { authRoute } from "./lib/controllers/auth.controller";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(morgan("dev"));
app.use(
	cookieSession({
		signed: false,
		secure: false
	})
);

// routes
app.use("/api/v1/auth", authRoute);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
