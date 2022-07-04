import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	NotAuthorizedError,
} from "socialdev-common";
import { Friends } from "../models/Friends";

const router = express.Router();

// Route        ---> GET /api/friends/:user_id/friends_list
// Description  ---> Get friends list by user_id
// Access       ---> Private
router.get(
	"/:user_id/friends_list",
	requireAuth,
	async (req: Request, res: Response) => {
		const { user_id: userId } = req.params;

		try {
			const queryResponse = await Friends.findById(userId);
			if (queryResponse !== null || undefined) {
				res.status(200).json(queryResponse!.friendsList);
			} else {
				throw new NotFoundError();
			}
		} catch (err) {
			throw new NotFoundError();
		}
	}
);

// Route        ---> GET /api/friends/sent_requests_list
// Description  ---> Get sent friend requests list by user_id
// Access       ---> Private
router.get(
	"/sent_requests_list",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;

		try {
			const queryResponse = await Friends.findById(userId);

			if (queryResponse!.id !== req.currentUser?.id) {
				throw new NotAuthorizedError();
			}
			if (queryResponse !== null || undefined) {
				res.status(200).json(queryResponse!.sentRequests);
			}
		} catch (err) {
			throw new NotAuthorizedError();
		}
	}
);

// Route        ---> GET /api/friends/:user_id/received_requests_list
// Description  ---> Get received friend requests list by user_id
// Access       ---> Private
router.get(
	"/received_requests_list",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;

		try {
			const queryResponse = await Friends.findById(userId);

			if (queryResponse!.id !== req.currentUser?.id) {
				throw new NotAuthorizedError();
			}
			if (queryResponse !== null || undefined) {
				res.status(200).json(queryResponse!.receivedRequests);
			}
		} catch (err) {
			throw new NotAuthorizedError();
		}
	}
);

// TODO: remove this route its only for developing perpuses
router.get(
	"/friends_object",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;

		try {
			const queryResponse = await Friends.findById(userId);

			if (queryResponse!.id !== req.currentUser?.id) {
				throw new NotAuthorizedError();
			}
			if (queryResponse !== null || undefined) {
				res.status(200).json(queryResponse);
			}
		} catch (err) {
			throw new NotAuthorizedError();
		}
	}
);

export { router as QueryFriendsRouter };
