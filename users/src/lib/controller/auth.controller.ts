import express, { Request, Response } from "express";

let router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    throw new Error('Ajay');
});

export { router as authRouter };
