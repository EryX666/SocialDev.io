import express, { Request, Response } from "express";

const router = express.Router();

// Route        ---> POST api/auth/signout
// Description  ---> Sign out a user
// Access       ---> Public
router.post("/signout", (req: Request, res: Response) => {
	req.session = null;
	res.send({});
});

export { router as signoutRouter };
