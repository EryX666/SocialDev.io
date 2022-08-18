import express, { Request, Response } from "express";

import { currentUser } from "socialdev-common";

const router = express.Router();

// Route        ---> GET api/auth/currentuser
// Description  ---> Return the current logged in user based on JWT or null
// Access       ---> Public
router.get("/currentuser", currentUser, (req: Request, res: Response) => {
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
