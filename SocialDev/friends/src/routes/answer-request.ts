import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	BadRequestError,
	indexOfObjectInArray,
	objectInArray,
} from "@obiproduction/socialnet-api-common";
import { Friends } from "../models/Friends";

const router = express.Router();

// Route        ---> POST /api/friends/answer_friend_request/:userA_Id/:answer
// Description  ---> User B answer to User A friend request
// Access       ---> Private
router.post(
	"/answer_friend_request/:userA_Id/:answer",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userB_Id, handle: userB_Handle } = req.currentUser!;
		const { answer, userA_Id } = req.params;

		if (answer !== "accept" && answer !== "reject") {
			throw new BadRequestError(
				"answer is either accept or reject for a friend request"
			);
		}

		try {
			// user B is the receiver of the friend request
			const userB = await Friends.findById(
				{ _id: userB_Id },
				{},
				{ returnOriginal: false }
			);

			// user A is the sender of the friend request
			const userA = await Friends.findById(
				{ _id: userA_Id },
				{},
				{ returnOriginal: false }
			);

			const userB_ReceivedRequests = userB!.receivedRequests;
			const userB_FriendsList = userB!.friendsList;
			const userB_RequestInArray = objectInArray(
				userB_ReceivedRequests,
				userA_Id
			);

			const userB_RequestStatus = userB_RequestInArray.status;

			if (userB_RequestInArray) {
				if (userB_RequestStatus === "accepted") {
					res
						.status(400)
						.send(
							"You cant send two requests to the user, you are friends already."
						);
				} else {
					const userA_SentRequests = userA!.sentRequests;
					const userA_FriendsList = userA!.friendsList;
					const userA_RequestInArray = objectInArray(
						userA_SentRequests,
						userB_Id.toString()
					);

					const userB_RequestIndex = indexOfObjectInArray(
						userB_ReceivedRequests,
						userA_Id
					);

					if (answer === "accept") {
						userB_RequestInArray.status = "accepted";
						userA_RequestInArray.status = "accepted";

						let userB_NewFriendModel = {
							_id: userA_Id,
							friendId: userA_Id,
							friendHandle: userB_RequestInArray.fromUserHandle,
						};

						let userA_NewFriendModel = {
							_id: userB_Id,
							friendId: userB_Id,
							friendHandle: userA_RequestInArray.toUserHandle,
						};

						userB_FriendsList.push(userB_NewFriendModel);
						userA_FriendsList.push(userA_NewFriendModel);
						await userB!.save();
						await userA!.save();
						res.status(201).json({ success: true, userA, userB });
					}

					if (answer === "reject") {
						userB_RequestInArray.status = "rejected";
						userA_RequestInArray.status = "rejected";
						await userB!.save();
						await userA!.save();
						res.status(201).json({ success: true, userA, userB });
					}
				}
			} else {
				throw new NotFoundError();
			}
		} catch (err) {
			console.log(err);
		}
	}
);

export { router as AnswerFriendsRequestsRouter };
