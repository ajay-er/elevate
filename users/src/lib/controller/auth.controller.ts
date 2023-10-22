import express, { Request, Response } from "express";

let router = express.Router();

router.post("/pay-verify", async (req: Request, res: Response) => {});

export { router as authRouter };
