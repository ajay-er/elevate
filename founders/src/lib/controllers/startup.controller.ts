import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { StartupService } from "../service/startup.service";

let router = express.Router();

const startupService = container.resolve(StartupService);

router.post("/add-startup", async (req: Request, res: Response) => {
	const result = await startupService.create();
	res.status(201).json({ result, message: "Startup added successfully" });
});

router.get("/startups", async (req: Request, res: Response) => {
    const result = await startupService.get();
	res.status(200).json({result});
});

export { router as startupRoute };
