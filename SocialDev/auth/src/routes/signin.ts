import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Password } from "../services/password";

import { loginValidation } from "../utilities/validation/validate";
import { validateRequest, BadRequestError } from "socialdev-common";
import { User } from "../models/user";

const router = express.Router();

// Route        ---> POST api/users/signin
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

		res.status(200).send(existingUser);
	}
);

export { router as signinRouter };
