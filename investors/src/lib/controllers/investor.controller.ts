import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { InvestorService } from "../service/investor.service";

let router = express.Router();

const investorService = container.resolve(InvestorService);

router.post("/", async (req: Request, res: Response) => {
    investorService.create()
	res.status(200).json({ message: "profile image updated successfully" });
});


export { router as investorRoute };
