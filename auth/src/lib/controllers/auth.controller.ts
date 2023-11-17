import express, { Request, Response } from "express";
import { BadRequestError } from "@ajay404/elevate";
import jwt from "jsonwebtoken";
import { Password } from "../service/password.service";
import { generateOtp } from "../../utils/generateOtp";
import { verifyEmailTemplate } from "../../templates/verifyEmail";
import { sendMail } from "../../config/nodemailer";
import { resetPassEmailTemplate } from "../../templates/resetPassEmailTemplate";
import { IRole } from "../interfaces";
import { AuthService } from "../service/auth.service";
import { container } from "tsyringe";
import { TokenService } from "../service/token.service";
import { kProducer } from "../../config/dummytry";

let router = express.Router();

const authService = container.resolve(AuthService);
const tokenService = container.resolve(TokenService);

router.post("/googleauth", async (req: Request, res: Response) => {
	const { googleToken } = req.body;
	if (!googleToken) throw new BadRequestError("Please provide google id_token");

	const oAuthuser = await authService.verifyOauthToken(googleToken, process.env.CLIENT_ID!);

	if (!oAuthuser) throw new BadRequestError("oops user not found in the google_token");

	const userexist = await authService.findUserByEmail(oAuthuser.email);

	let accessToken = jwt.sign(
		{
			id: userexist?._id,
			email: userexist?.email,
			role: IRole.USER
		},
		process.env.JWT_SECRET!
	);

	accessToken = "google:" + accessToken;

	if (!userexist) {
		//if user doen't exist,then create
		const user = await authService.signup({
			email: oAuthuser.email,
			firstName: oAuthuser.name,
			isEmailVerified: oAuthuser.isEmailVerified
		});
		console.log(user);
		return res.status(201).json({ message: "google signup successfully completed", user, accessToken });
	} else {
		//if user already then update
		const user = await authService.update(oAuthuser);
		console.log(user);
		return res.status(200).json({ message: "google login successfully completed", user, accessToken });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await authService.findUserByEmail(email);

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

	let accessToken = jwt.sign(
		{
			id: user?._id,
			email: user?.email,
			role: IRole.USER
		},
		process.env.JWT_SECRET!
	);

	accessToken = "access:" + accessToken;

	res.status(200).json({ message: `Login succesfull`, user, accessToken });
});

router.post("/signup", async (req: Request, res: Response) => {
	const { email } = req.body;

	let user = await authService.findUserByEmail(email);

	if (user) {
		if (user.isEmailVerified) {
			throw new BadRequestError("Email already in use");
		} else {
			await authService.updateUser(email, req.body);
		}
	} else {
		user = await authService.signup(req.body);
	}

	const otp: string = generateOtp();
	const emailTemplate = verifyEmailTemplate(otp);
	// SEND EMAIL FOR EMAIL VERIFICATION
	const result = await sendMail({
		to: email,
		subject: "Elevate-verification",
		html: emailTemplate.html,
		text: emailTemplate.text
	});

	if (!result) {
		throw new BadRequestError("Oops something went wrong!Please try again later!");
	}

	user.isEmailVerified = false;
	user.otp = otp;

	user = await authService.saveUser(user);

	await kProducer("wow", { name: "ajay", age: "😉🚀🥲🔼🌎" });

	res.status(200).json({ message: `Email verification OTP sent successfully to ${email}`, user });
});

router.post("/resend-otp", async (req: Request, res: Response) => {
	const { email } = req.body;

	let user = await authService.findUserByEmail(email);

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

	user = await authService.saveUser(user);

	res.status(200).json({ message: `Email verification OTP sent successfully to ${email}`, user });
});

router.post("/verify-otp", async (req: Request, res: Response) => {
	const { email, otp } = req.body;

	const user = await authService.findUserByEmail(email);

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

	await authService.saveUser(user);

	let accessToken = jwt.sign(
		{
			id: user?._id,
			email: user?.email,
			role: IRole.USER
		},
		process.env.JWT_SECRET!
	);

	accessToken = "access:" + accessToken;

	res.status(200).json({ message: "OTP verified successfully", user, accessToken });
});

router.post("/forgot-password", async (req: Request, res: Response) => {
	const { email } = req.body;

	const user = await authService.findUserByEmail(email);

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

	await tokenService.createNew({ email, token: resetToken });

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

	const storedToken = await tokenService.findByEmailAndToken(email, token);

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

	const storedToken = await tokenService.findByEmailAndToken(email, token);

	if (!storedToken) {
		throw new BadRequestError("Invalid or token");
	}

	const hashedPassword = await Password.toHash(newPassword);

	await authService.updatePasswordByEmail(email, hashedPassword);

	res.status(200).json({ message: "Password reset successful" });
});

router.post("/admin-login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (email !== process.env.ADMIN || password !== process.env.ADMIN_PASSWORD) {
		throw new BadRequestError("Invalid credentials");
	}

	let accessToken = jwt.sign(
		{
			email: process.env.ADMIN,
			role: IRole.ADMIN
		},
		process.env.JWT_SECRET!
	);

	accessToken = "access:" + accessToken;

	res.status(200).json({ message: `Login succesfull`, accessToken });
});

router.post("/logout", async (req: Request, res: Response) => {
	res.status(200).json({ message: "logout succefully" });
});

export { router as authRoute };
