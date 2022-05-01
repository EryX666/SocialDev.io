// import express, { Request, Response } from "express";
// import {
// 	requireAuth,
// 	NotFoundError,
// 	indexOfObjectInArray,
// 	objectInArray,
// } from "@obiproduction/socialnet-api-common";
// import { Friends } from "../models/Friends";

// const router = express.Router();

// // Route        ---> POST /api/friends/send_friend_request/:userB_id
// // Description  ---> User A sends a friend request to User B / User A unsends a sent request to User B
// // Access       ---> Private
// router.post(
// 	"/send_friend_request/:userB_id",
// 	requireAuth,
// 	async (req: Request, res: Response) => {
// 		const { id: userA_Id, handle: currentUserHandle } = req.currentUser!;
// 		let { userB_id: userB_Id } = req.params;

// 		try {
// 			const userA = await Friends.findById(
// 				{ _id: userA_Id },
// 				{},
// 				{ returnOriginal: false }
// 			);
// 			const userB = await Friends.findById(
// 				{ _id: userB_Id },
// 				{},
// 				{ returnOriginal: false }
// 			);

// 			const userA_SentRequests = userA!.sentRequests;
// 			const userA_FriendsList = userA!.friendsList;

// 			const userB_ReceivedRequests = userB!.receivedRequests;

// 			const check_SendToYourself = userB_Id === userA_Id;
// 			const check_RequestAlreadySent = objectInArray(
// 				userA_SentRequests,
// 				userB_Id
// 			);
// 			const check_AlreadyFriends = objectInArray(userA_FriendsList, userB_Id);
// 			if (check_SendToYourself) {
// 				res.status(400).send("You cant send a friend request to yourself...");
// 				return false;
// 			}

// 			if (check_AlreadyFriends) {
// 				res
// 					.status(400)
// 					.send("You and " + userB!.ownerHandle + " are already friends");
// 				return false;
// 			}

// 			if (check_RequestAlreadySent) {
// 				// this is a toggle switch functionality of "on" and "off" for send/unsend for front-end
// 				const userA_requestIndex = indexOfObjectInArray(
// 					userA_SentRequests,
// 					userB_Id
// 				);
// 				const userB_requestIndex = indexOfObjectInArray(
// 					userB_ReceivedRequests,
// 					userA_Id
// 				);

// 				userA_SentRequests.splice(userA_requestIndex!, 1);
// 				userB_ReceivedRequests.splice(userB_requestIndex!, 1);

// 				await userA!.save();
// 				await userB!.save();
// 				res.status(201).json({
// 					success: true,
// 					message: "Friend request unsent successfully!",
// 				});
// 			} else {
// 				let userA_senderData = {
// 					_id: userB_Id,
// 					toUserId: userB_Id,
// 					toUserHandle: userB!.ownerHandle,
// 				};
// 				let userB_receiverData = {
// 					_id: userA_Id,
// 					fromUserId: userA_Id,
// 					fromUserHandle: userA!.ownerHandle,
// 				};

// 				userA_SentRequests.push(userA_senderData);
// 				userB_ReceivedRequests.push(userB_receiverData);

// 				await userA!.save();
// 				await userB!.save();
// 				res.status(201).json({
// 					success: true,
// 					message: "Friend request sent successfully!",
// 				});
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// );

// export { router as SendFriendsRequestsRouter };
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

// Route        ---> POST /api/friends/cancel_friendship/:userB_id
// Description  ---> User A cancel a friendship with User B
// Access       ---> Private
router.delete(
	"/cancel_friendship/:userB_id",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userA_Id } = req.currentUser!;
		const { userB_id: userB_Id } = req.params;

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

			const userA_FriendsList = userA!.friendsList;
			const userB_FriendsList = userB!.friendsList;

			const check_IfFriends = objectInArray(userA_FriendsList, userB_Id);

			if (!check_IfFriends) {
				throw new BadRequestError("Your not friends with this user!");
			}
			// User A model handeling
			const userA_SentRequests = userA!.sentRequests;
			const userA_ReceivedRequests = userA!.receivedRequests;
			const userA_RequestInReceivedArray = objectInArray(
				userA_ReceivedRequests,
				userB_Id
			);
			const userA_RequestInSentArray = objectInArray(
				userA_SentRequests,
				userB_Id
			);
			// User B model handeling
			const userB_SentRequests = userB!.sentRequests;
			const userB_ReceivedRequests = userB!.receivedRequests;
			const userB_RequestInReceivedArray = objectInArray(
				userB_ReceivedRequests,
				userA_Id
			);
			const userB_RequestInSentArray = objectInArray(
				userB_SentRequests,
				userA_Id
			);

			if (userA_RequestInReceivedArray) {
				const userA_RequestIndex = indexOfObjectInArray(
					userA_ReceivedRequests,
					userB_Id
				);
				const userB_RequestIndex = indexOfObjectInArray(
					userB_SentRequests,
					userA_Id
				);
				userA_ReceivedRequests.splice(userA_RequestIndex!, 1);
				userB_SentRequests.splice(userB_RequestIndex!, 1);

				const userA_FriendshipIndex = indexOfObjectInArray(
					userA_FriendsList,
					userB_Id
				);
				const userB_FriendshipIndex = indexOfObjectInArray(
					userB_FriendsList,
					userA_Id
				);
				userA_FriendsList.splice(userA_FriendshipIndex!, 1);
				userB_FriendsList.splice(userB_FriendshipIndex!, 1);
				await userA!.save();
				await userB!.save();
				res
					.status(201)
					.json({
						success: true,
						userA: userA_FriendsList,
						userB: userB_FriendsList,
					});
			} else if (userA_RequestInSentArray) {
				const userA_RequestIndex = indexOfObjectInArray(
					userA_SentRequests,
					userB_Id
				);

				const userB_RequestIndex = indexOfObjectInArray(
					userB_ReceivedRequests,
					userA_Id
				);

				userA_SentRequests.splice(userA_RequestIndex!, 1);
				userB_ReceivedRequests.splice(userB_RequestIndex!, 1);

				const userA_FriendshipIndex = indexOfObjectInArray(
					userA_FriendsList,
					userB_Id
				);
				const userB_FriendshipIndex = indexOfObjectInArray(
					userB_FriendsList,
					userA_Id
				);
				userA_FriendsList.splice(userA_FriendshipIndex!, 1);
				userB_FriendsList.splice(userB_FriendshipIndex!, 1);
				await userA!.save();
				await userB!.save();
				res
					.status(201)
					.json({
						success: true,
						userA: userA_FriendsList,
						userB: userB_FriendsList,
					});
			} else {
				throw new BadRequestError("Something went wrong...");
			}
		} catch (err) {
			console.log(err);
		}
	}
);

export { router as CancelFriendshipRouter };
