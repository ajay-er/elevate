import { currentUser, requireAuth } from "@ajay404/elevate";
import express, { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { container } from "tsyringe";

let router = express.Router();

router.use(currentUser);

const authService = container.resolve(AuthService);

router.get("/get-profile", requireAuth, async (req: Request, res: Response) => {
	const email = req.currentUser?.email;
	const user = await authService.findUserByEmail(email!);
	res.status(200).json(user);
});

router.get("/update-name", requireAuth, async (req: Request, res: Response) => {
	const email = req.currentUser?.email;
	const user = await authService.updateData(email!, req.body);
	res.status(200).json({ message: "name updated successfully", user });
});

router.get("/update-phone", requireAuth, async (req: Request, res: Response) => {
	const email = req.currentUser?.email;
	const user = await authService.updateData(email!, req.body);
	res.status(200).json({ message: "phone updated successfully", user });
});

router.get("/update-image", requireAuth, async (req: Request, res: Response) => {
	const email = req.currentUser?.email;
	const user = await authService.updateData(email!, req.body);
	res.status(200).json({ message: "profile image updated successfully", user });
});

// TODO:complete address
router.get("/upsert-address", requireAuth, async (req: Request, res: Response) => {});

export { router as profileRoute };
