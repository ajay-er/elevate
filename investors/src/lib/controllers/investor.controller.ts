import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { InvestorService } from "../service/investor.service";

let router = express.Router();

const investorService = container.resolve(InvestorService);

router.post("/add-investor", async (req: Request, res: Response) => {
	const result = await investorService.create();
	res.status(201).json({ message: "investor created successfully" });
});

router.get("/investors", async (req: Request, res: Response) => {
	const result = await investorService.get();
	res.status(200).json({ result });
});

export { router as investorRoute };
