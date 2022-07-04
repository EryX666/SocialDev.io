import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "socialdev-common";
import { Posts } from "../models/Posts";

const router = express.Router();

// Route        ---> POST api/posts/:post_id/like
// Description  ---> Like or unlike a post by id
// Access       ---> Private
router.post(
	"/:post_id/like",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { post_id: postId } = req.params;

		await Posts.findById(postId)
			.then((post: any) => {
				if (post.likes.length > 0) {
					let userHasLiked = post.likes.filter(
						(like: any) => like.user.toString() === userId
					);

					if (userHasLiked.length > 0) {
						const removeIndex = post.likes
							.map((like: any) => like.user.toString())
							.indexOf(userId);
						post.likes.splice(removeIndex, 1);

						post.save().then((post: any) => res.status(200).json(post));
						return false;
					}
				}
				let userLiked = {
					user: userId,
				};
				post.likes.push(userLiked);
				post.save().then((post: any) => res.status(201).json(post));
			})
			.catch(() => {
				throw new NotFoundError();
			});
	}
);

export { router as LikePostRouter };
