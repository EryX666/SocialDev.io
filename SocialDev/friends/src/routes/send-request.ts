import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	indexOfObjectInArray,
	objectInArray,
} from "socialdev-common";
import { Friends } from "../models/Friends";

const router = express.Router();

// Route        ---> POST /api/friends//send_friend_request/:userB_id
// Description  ---> User A sends a friend request to User B / User A unsends a sent request to User B
// Access       ---> Private
router.post(
	"/send_friend_request/:userB_id",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userA_Id, handle: currentUserHandle } = req.currentUser!;
		let { userB_id: userB_Id } = req.params;

		try {
			const userA = await Friends.findById(
				{ _id: userA_Id },
				{},
				{ returnOriginal: false }
			);
			const userB = await Friends.findById(
				{ _id: userB_Id },
				{},
				{ returnOriginal: false }
			);

			const userA_SentRequests = userA!.sentRequests;
			const userA_FriendsList = userA!.friendsList;

			const userB_ReceivedRequests = userB!.receivedRequests;

			const check_SendToYourself = userB_Id === userA_Id;
			const check_RequestAlreadySent = objectInArray(
				userA_SentRequests,
				userB_Id
			);
			const check_AlreadyFriends = objectInArray(userA_FriendsList, userB_Id);
			if (check_SendToYourself) {
				res.status(400).send("You cant send a friend request to yourself...");
				return false;
			}

			if (check_AlreadyFriends) {
				res
					.status(400)
					.send("You and " + userB!.ownerHandle + " are already friends");
				return false;
			}

			if (check_RequestAlreadySent) {
				// this is a toggle switch functionality of "on" and "off" for send/unsend for front-end
				const userA_requestIndex = indexOfObjectInArray(
					userA_SentRequests,
					userB_Id
				);
				const userB_requestIndex = indexOfObjectInArray(
					userB_ReceivedRequests,
					userA_Id
				);

				userA_SentRequests.splice(userA_requestIndex!, 1);
				userB_ReceivedRequests.splice(userB_requestIndex!, 1);

				await userA!.save();
				await userB!.save();
				res.status(201).json({
					success: true,
					message: "Friend request unsent successfully!",
				});
			} else {
				let userA_senderData = {
					_id: userB_Id,
					toUserId: userB_Id,
					toUserHandle: userB!.ownerHandle,
				};
				let userB_receiverData = {
					_id: userA_Id,
					fromUserId: userA_Id,
					fromUserHandle: userA!.ownerHandle,
				};

				userA_SentRequests.push(userA_senderData);
				userB_ReceivedRequests.push(userB_receiverData);

				await userA!.save();
				await userB!.save();
				res.status(201).json({
					success: true,
					message: "Friend request sent successfully!",
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
);

export { router as SendFriendsRequestsRouter };
