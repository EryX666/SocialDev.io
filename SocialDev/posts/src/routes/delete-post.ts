import express, { Request, Response } from "express";
import { requireAuth, NotAuthorizedError } from "socialdev-common";
import { Posts } from "../models/Posts";
import { PostDeletedPublisher } from "../events/publishers/post-deleted-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

// Route        ---> DELETE api/posts/:post_id/delete
// Description  ---> delete a post
// Access       ---> Private
router.delete(
	"/:post_id/delete",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { post_id: postId } = req.params;

		const queryPost = await Posts.findOne({ _id: postId });
		const PostOwner = JSON.stringify(queryPost!.user);

		if (userId === PostOwner.replace(/['"]+/g, "")) {
			await Posts.deleteOne({ _id: postId });
			await new PostDeletedPublisher(natsWrapper.client).publish({
				id: queryPost!.id,
			});
		} else {
			throw new NotAuthorizedError();
		}

		res.status(201).json({ success: true, DeletedPost: queryPost });
	}
);

export { router as DeletePostRouter };
