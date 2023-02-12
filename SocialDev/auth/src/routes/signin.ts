import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Password } from "../services/password";

import { loginValidation } from "../utilities/validation/validate";
import { validateRequest, BadRequestError } from "socialdev-common";
import { User } from "../models/user";

const router = express.Router();

// Route        ---> POST api/auth/signin
// Description  ---> Sign in a registered user
// Access       ---> Public
router.post(
	"/signin",
	loginValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new BadRequestError("Invalid Email/Password");
		}

		const passwordsMatch = await Password.compare(
			existingUser.password,
			password
		);

		if (!passwordsMatch) {
			throw new BadRequestError("Invalid Email/Password");
		}

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
				handle: existingUser.handle,
			},
			process.env.JWT_KEY!
		);

		// Store it on session object
		req.session = {
			jwt: userJwt,
		};

		const date = new Date().toLocaleString();
		console.log(date);

		const checkFirstConnection = await existingUser.log.length;
		if (checkFirstConnection <= 0) {
			await existingUser.log.push({ date: date, firstConnection: true });
			await existingUser.save();
		} else {
			await existingUser.log.push({ date: date });
			await existingUser.save();
		}

		res.status(200).send(existingUser);
	}
);

export { router as signinRouter };
