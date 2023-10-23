import { UnAuthorizedError } from "@ajay404/elevate";
import express, { Request, Response } from "express";

let router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    throw new UnAuthorizedError();
});

export { router as authRouter };
