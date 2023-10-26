import express, { Request, Response } from "express";
import { BadRequestError, verifyGoogleOAuth2 } from "@ajay404/elevate";
import { UserRepository } from "../database/repository/User.repository";
import jwt from "jsonwebtoken";
import { Password } from "../service/password.service";
import { generateOtp } from "../../utils/generateOtp";
import { verifyEmailTemplate } from "../../templates/verifyEmail";
import { sendMail } from "../../config/nodemailer";

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
	req.session = { googleToken };

	let userResult;
	if (!userexist) {
		//if user doen't exist,then create
		userResult = await userRepo.signup({ email: user.email, firstName: user.name });
		statuscode = 201;
		return res.status(statuscode).json({ message: "google signup successfully completed", userResult });
	} else {
		//if user already then update
		await userRepo.update(user);
		userResult = { email: user.email, firstName: user.name, profileImgUrl: user.picture };
		return res.status(statuscode).json({ message: "google login successfully completed", userResult });
	}
});

router.post("/signup", async (req: Request, res: Response) => {
	const { email, password, firstName, lastName } = req.body;

	const existingUser = await userRepo.findByEmail(email);
	if (existingUser) {
		throw new BadRequestError("Email already in use");
	}
	const user = await userRepo.signup({
		email,
		password,
		firstName,
		lastName
	});

	const userJWT = jwt.sign(
		{
			id: user?._id,
			email: user?.email
		},
		process.env.JWT_SECRET!
	);
	req.session = { jwt: userJWT };

	res.status(201).json(user);
});

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await userRepo.findByEmail(email);

	if (!user || !user?.password) {
		throw new BadRequestError("Invalid credentials");
	}

	const passwordsMatch = await Password.compare(user.password, password);

	if (!passwordsMatch) {
		throw new BadRequestError("Invalid credentials");
	}

	const userJWT = jwt.sign(
		{
			id: user?._id,
			email: user?.email
		},
		process.env.JWT_SECRET!
	);

	req.session = { jwt: userJWT };

	res.status(200).json(user);
});

router.post("/verify-email", async (req: Request, res: Response) => {
	const { email } = req.body;
	const user = await userRepo.findByEmail(email);
	if (!user) {
		throw new BadRequestError("Email not registered!Please signup");
	}
	const otp: string = generateOtp();
	user.otp = otp;

	const emailTemplate = verifyEmailTemplate(otp);
	//SEND FORGOT PASSWORD EMAIL
	await sendMail({
		to: email,
		subject: "Elevate-verification",
		html: emailTemplate.html,
		text: emailTemplate.text
	});

	user.save();
	res.status(200).json({ message: `OTP sent successfully to ${email}` });
});

router.post("/verify-otp", async (req: Request, res: Response) => {
	const { email, otp } = req.body;
	const user = await userRepo.findByEmail(email);
	if (!user) {
		throw new BadRequestError("Email not registered! Please signup");
	}

	if (otp !== user.otp) {
		throw new BadRequestError("Invalid OTP. Please check your OTP and try again.");
	}

	user.otp = null;
	user.save();
	res.status(200).json({ message: "OTP verified successfully", user });
});

router.post("/logout", async (req: Request, res: Response) => {
	req.session = null;
	res.status(200).json({ message: "logout succefully" });
});

export { router as authRoute };
