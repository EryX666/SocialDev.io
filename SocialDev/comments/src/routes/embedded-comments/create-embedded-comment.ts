import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	validateRequest,
} from "@obiproduction/socialnet-api-common";
import { Comments } from "../../models/comments";
import { createCommentValidation } from "../../utilities/validation/validate";

const router = express.Router();

// Route        ---> Post api/posts/:post_id/comment/:comment_id/embedded/create
// Description  ---> Create a new embedded comment - a comment on a comment
// Access       ---> Private
router.post(
	"/:post_id/comment/:comment_id/embedded/create",
	requireAuth,
	createCommentValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { id: userId, handle } = req.currentUser!;
		const { post_id: postId, comment_id: commentId } = req.params;
		const { text } = req.body;

		const commentContent = {
			user: "",
			handle,
			text,
		};
		commentContent.user = userId;
		commentContent.handle = handle;
		if (text) commentContent.text = text;

		console.log(postId);

		await Comments.findOneAndUpdate(
			{
				_id: postId,
			},
			{},
			{ returnOriginal: false }
		)
			.then((CommentSection: any) => {
				const { comments } = CommentSection;

				if (comments.length > 0) {
					const commentIndx = comments
						.map((comment: any) => comment.id.toString())
						.indexOf(commentId);
					if (commentIndx > -1) {
						comments[commentIndx].embedded_comments.push(commentContent);
						CommentSection.save().then(() => {
							res.status(201).json({
								success: true,
								newComment:
									comments[commentIndx].embedded_comments[
										comments[commentIndx].embedded_comments.length - 1
									],
							});
						});
					} else {
						throw new NotFoundError();
					}
				} else {
					throw new NotFoundError();
				}
			})
			.catch((err: string) => {
				console.log(err);
				throw new NotFoundError();
			});
	}
);

export { router as CreateEmbeddedCommentsRouter };
