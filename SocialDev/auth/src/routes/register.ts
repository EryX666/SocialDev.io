import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	validateRequest,
	BadRequestError,
} from "@obiproduction/socialnet-api-common";
import { User } from "../models/user";
import { signupValidation } from "../utilities/validation/validate";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

// Route        ---> POST api/auth/register
// Description  ---> Register a new user
// Access       ---> Public
router.post(
	"/register",
	signupValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password, handle } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError("Email already in use");
		}

		const user = User.build({ email, password, handle });
		await user.save();

		await new UserCreatedPublisher(natsWrapper.client).publish({
			id: user.id,
			handle: user.handle,
		});

		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
				handle: user.handle,
			},
			process.env.JWT_KEY!
		);

		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as registerRouter };
