import express, { Request, Response } from "express";
import { BadRequestError, verifyGoogleOAuth2 } from "@ajay404/elevate";
import { UserRepository } from "../database/repository/User.repository";
import jwt from "jsonwebtoken";

let router = express.Router();

const userRepo = new UserRepository();

router.post("/googleauth", async (req: Request, res: Response) => {
	const { googleToken } = req.body;
	let statuscode = 200;
	if (!googleToken) throw new BadRequestError("Please provide google id_token");
	const user = await verifyGoogleOAuth2(googleToken, process.env.CLIENT_ID!);
	if (!user) {
		throw new BadRequestError("oops user not found in the google_token");
	}
	const userexist = await userRepo.findByEmail(user.email);
	let result;
	if (!userexist) {
		//if user doen't exist,then create
		result = await userRepo.signup({ email: user.email, firstName: user.name });
		statuscode = 201;
	} else {
		//if user already then update
		result = await userRepo.update(user);
	}
	req.session = { googleToken };

	res.json(statuscode).json({ message: "google authentication successfully completed", result });
});

router.post("/signup", async (req: Request, res: Response) => {
	const { email, password, firstName } = req.body;

	const existingUser = await userRepo.findByEmail(email);
	if (existingUser) {
		throw new BadRequestError("Email already in use");
	}

	const user = await userRepo.signup({
		email,
		password,
		firstName
	});

	const userJWT = jwt.sign(
		{
			id: user?._id,
			email: user?.email
		},
		process.env.JWT_SECRET!
	);

	req.session = { jwt: userJWT };

	res.status(201).send(user);
});

export { router as authRoute };
