import express, { Request, Response } from "express";
import { Profiles } from "../models/profiles";
import { requireAuth } from "socialdev-common";

const router = express.Router();

// Route        ---> GET api/profile/current
// Description  ---> Get current user profile
// Access       ---> Private
router.get("/current", requireAuth, async (req: Request, res: Response) => {
	const { id: userId } = req.currentUser!;

	const profile = await Profiles.findById(userId);

	res.status(200).json(profile);
});

export { router as CurrentProfileRouter };
