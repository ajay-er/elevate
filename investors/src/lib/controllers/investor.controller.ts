import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { InvestorService } from "../service/investor.service";

let router = express.Router();

const investorService = container.resolve(InvestorService);

router.post("/add-investor", async (req: Request, res: Response) => {
	const result = await investorService.create(req.body);
	res.status(201).json({ message: "investor created successfully", result });
});

router.get("/investors", async (req: Request, res: Response) => {
	const result = await investorService.get();
	res.status(200).json({ result });
});

router.get("/profile/:id", async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await investorService.findById(id);
	res.status(200).json({ result });
});

export { router as investorRoute };
