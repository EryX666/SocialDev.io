import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	validateRequest,
} from "@obiproduction/socialnet-api-common";
import { Comments } from "../models/comments";
import { createCommentValidation } from "../utilities/validation/validate";

const router = express.Router();

// Route        ---> Post api/post-comments/:post_id/comment/create
// Description  ---> Create a new comment
// Access       ---> Private
router.post(
	"/:post_id/comment/create",
	requireAuth,
	createCommentValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { id: userId, handle } = req.currentUser!;
		const { post_id: postId } = req.params;
		const { text } = req.body;

		const commentContent = {
			user: "",
			handle,
			text,
		};
		commentContent.user = userId;
		commentContent.handle = handle;
		if (text) commentContent.text = text;

		await Comments.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				// TODO: fix this typescript error
				// @ts-ignore
				$push: { comments: commentContent },
			},
			{ returnOriginal: false }
		)
			.then((post: any) => {
				console.log(post);
				const { comments } = post;
				const newComment = comments[comments.length - 1];
				res.status(201).json({
					success: true,
					newComment,
				});
			})
			.catch((err: string) => {
				console.log(err);
				throw new NotFoundError();
			});
	}
);

export { router as CreatePostCommentRouter };
