import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
} from "@obiproduction/socialnet-api-common";
import { Profiles } from "../models/profiles";

const router = express.Router();
// TODO: combine handle and user_id into one query using RegEx
// Route        ---> GET /api/profile/:handle || :user_id
// Description  ---> Get profile by handle
// Access       ---> Private
router.get(
	"/handle/:handle",
	requireAuth,
	async (req: Request, res: Response) => {
		const { handle } = req.params;

		const queryResponse = await Profiles.find({ handle });
		if (typeof queryResponse !== "undefined" && queryResponse.length > 0) {
			res.status(200).json(queryResponse);
		} else {
			throw new NotFoundError();
		}
	}
);

// Route        ---> GET api/profile
// Description  ---> Get profile by user_id
// Access       ---> Private
router.get("/:user_id", requireAuth, async (req: Request, res: Response) => {
	const { user_id: userId } = req.params;

	try {
		const queryResponse = await Profiles.findById(userId);
		if (queryResponse !== null || undefined) {
			res.status(200).json(queryResponse);
		} else {
			throw new NotFoundError();
		}
	} catch (err) {
		throw new NotFoundError();
	}

	// console.log(queryResponse);
	// console.log(typeof queryResponse);
	// if (typeof queryResponse !== "undefined" && queryResponse.length > 0) {

	// } else {

	// }
});

// Route        ---> GET api/profile
// Description  ---> Get all profiles
// Access       ---> Private
// Role         ---> ADMIN Only
router.get("/", requireAuth, async (req: Request, res: Response) => {
	const queryResponse = await Profiles.find();
	if (typeof queryResponse !== "undefined" && queryResponse.length > 0) {
		res.status(200).json(queryResponse);
	} else {
		throw new NotFoundError();
	}
});

export { router as QueryProfileRouter };
