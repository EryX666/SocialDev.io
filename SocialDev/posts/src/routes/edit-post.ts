import express, { Request, Response } from "express";
import {
	requireAuth,
	NotAuthorizedError,
	validateRequest,
} from "@obiproduction/socialnet-api-common";
import { Posts } from "../models/Posts";
import { editPostValidation } from "../utilities/validators";

const router = express.Router();

// Route        ---> PUT api/posts/:post_id/edit
// Description  ---> Edit a Post
// Access       ---> Private
router.put(
	"/:post_id/edit",
	requireAuth,
	editPostValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { post_id: postId } = req.params;
		const { text } = req.body;

		const queryPost = await Posts.findOne({ _id: postId });
		const PostOwner = JSON.stringify(queryPost!.user);

		if (userId === PostOwner.replace(/['"]+/g, "")) {
			await Posts.updateOne(
				{
					_id: postId,
				},
				{ $set: { text } },
				{ multi: true }
			).catch((err: string) => console.log(err));
		} else {
			throw new NotAuthorizedError();
		}

		const updatedPost = await Posts.findOne({ _id: postId });

		res.status(200).json({
			success: true,
			updatedPost,
		});
	}
);

export { router as EditPostRouter };
