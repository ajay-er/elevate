import express, { Request, Response } from "express";
import { BadRequestError, verifyGoogleOAuth2 } from "@ajay404/elevate";
import { UserRepository } from "../database/repository/User.repository";
import jwt from "jsonwebtoken";
import { Password } from "../service/password.service";
import { generateOtp } from "../../utils/generateOtp";
import { verifyEmailTemplate } from "../../templates/verifyEmail";
import { sendMail } from "../../config/nodemailer";
import { TokenRepository } from "../database/repository/Token.repository";
import { resetPassEmailTemplate } from "../../templates/resetPassEmailTemplate";

let router = express.Router();

const userRepo = new UserRepository();
const tokenRepo = new TokenRepository();

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

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await userRepo.findByEmail(email);

	if (!user || !user?.password) {
		throw new BadRequestError("Invalid credentials");
	}

	if (!user.isEmailVerified) {
		throw new BadRequestError("You are not a verified user. Please Signup and verify your email");
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

	res.status(200).json({ message: `Login succesfull`, user });
});

router.post("/signup", async (req: Request, res: Response) => {
	const { email } = req.body;

	let user = await userRepo.findByEmail(email);
	if (user) {
		if (user.isEmailVerified) {
			throw new BadRequestError("Email already in use");
		} else {
			await userRepo.updateUser(email, req.body);
		}
	} else {
		user = await userRepo.signup(req.body);
	}

	const otp: string = generateOtp();
	const emailTemplate = verifyEmailTemplate(otp);

	// SEND EMAIL FOR EMAIL VERIFICATION
	await sendMail({
		to: email,
		subject: "Elevate-verification",
		html: emailTemplate.html,
		text: emailTemplate.text
	});

	user.isEmailVerified = false;
	user.otp = otp;

	await user.save();

	res.status(200).json({ message: `Email verification OTP sent successfully to ${email}`, user });
});

router.post("/resend-otp", async (req: Request, res: Response) => {
	const { email } = req.body;

	const user = await userRepo.findByEmail(email);

	if (!user) {
		throw new BadRequestError("Email not registered! Please signup");
	}

	if (user.isEmailVerified) {
		throw new BadRequestError("Email already verified!");
	}

	const otp: string = generateOtp();
	const emailTemplate = verifyEmailTemplate(otp);

	// SEND EMAIL FOR EMAIL VERIFICATION
	await sendMail({
		to: email,
		subject: "Elevate-verification",
		html: emailTemplate.html,
		text: emailTemplate.text
	});

	user.otp = otp;

	await user.save();

	res.status(200).json({ message: `Email verification OTP sent successfully to ${email}`, user });
});

router.post("/verify-otp", async (req: Request, res: Response) => {
	const { email, otp } = req.body;

	const user = await userRepo.findByEmail(email);

	if (!user) {
		throw new BadRequestError("Email not registered! Please signup");
	}

	if (user && user.isEmailVerified) {
		throw new BadRequestError("Email already verified!");
	}

	if (otp !== user.otp) {
		throw new BadRequestError("Invalid OTP. Please check your OTP and try again.");
	}

	user.isEmailVerified = true;
	user.otp = null;
	await user.save();

	const userJWT = jwt.sign(
		{
			id: user?._id,
			email: user?.email
		},
		process.env.JWT_SECRET!
	);

	req.session = { jwt: userJWT };

	res.status(200).json({ message: "OTP verified successfully", user });
});

router.post("/forgot-password", async (req: Request, res: Response) => {
	const { email } = req.body;

	const user = await userRepo.findByEmail(email);

	if (!user) {
		throw new BadRequestError("Email not registered!Please signup");
	}

	const resetToken = jwt.sign(
		{
			email: user?.email
		},
		process.env.JWT_SECRET!,
		{ expiresIn: "15m" }
	);

	await tokenRepo.createNew({ email, token: resetToken });

	const emailTemplate = resetPassEmailTemplate(resetToken);

	await sendMail({
		to: email,
		subject: "Elevate-Reset password",
		html: emailTemplate.html,
		text: emailTemplate.text
	});

	res.status(200).json({ message: `Please reset new password using the link provided to ${email}` });
});

router.post("/reset-password", async (req: Request, res: Response) => {
	const { token } = req.body;

	if (!token) {
		throw new BadRequestError("Please provide token");
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { exp: number; email: string };

	console.log(decoded);

	const email = decoded.email;

	if (new Date() > new Date(decoded.exp * 1000)) {
		throw new BadRequestError("Token has expired.");
	}

	const storedToken = await tokenRepo.findByEmailAndToken(email, token);

	if (!storedToken) {
		throw new BadRequestError("Token not found or has been used.");
	}

	res.status(200).json({ message: "Please reset the password" });
});

router.post("/confirm-password", async (req: Request, res: Response) => {
	const { newPassword, token } = req.body;

	const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { exp: number; email: string };

	if (decoded.exp * 1000 < Date.now()) {
		throw new BadRequestError("Token has expired.");
	}
	const email = decoded.email;

	const storedToken = await tokenRepo.findByEmailAndToken(email, token);

	if (!storedToken) {
		throw new BadRequestError("Invalid or token");
	}

	const hashedPassword = await Password.toHash(newPassword);

	await userRepo.updatePasswordByEmail(email, hashedPassword);

	res.status(200).json({ message: "Password reset successful" });
});

router.post("/logout", async (req: Request, res: Response) => {
	req.session = null;
	res.status(200).json({ message: "logout succefully" });
});

export { router as authRoute };
