import express, { Request, Response } from "express";
import {
	requireAuth,
	validateRequest,
} from "@obiproduction/socialnet-api-common";
import { Comments } from "../models/comments";
import { editCommentValidation } from "../utilities/validation/validate";

const router = express.Router({ mergeParams: true });

// Route        ---> PUT api/post-comments/:post_id/comment/:comment_id/edit
// Description  ---> Edit a comment on a post
// Access       ---> Private
router.put(
	"/:post_id/comment/:comment_id/edit",
	requireAuth,
	editCommentValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { post_id: postId, comment_id: commentId } = req.params;
		const { text } = req.body;

		await Comments.findOneAndUpdate(
			{ _id: postId, "comments._id": commentId },
			{},
			{ returnOriginal: true }
		)
			.then((commentSection: any) => {
				const { comments } = commentSection;
				if (comments.length > 0) {
					const changeIndex = comments
						.map((comment: any) => comment.id.toString())
						.indexOf(commentId);

					if (changeIndex > -1) {
						if (userId === comments[changeIndex].user.toString()) {
							comments[changeIndex].text = text;
							commentSection
								.save()
								.then(() =>
									res
										.status(200)
										.json({ success: true, newComment: comments[changeIndex] })
								);
						} else {
							res.status(401).json({ errors: [{ message: "Not Authorized" }] });
						}
					} else {
						res.status(404).json({ errors: [{ message: "Not Found" }] });
					}
				}
			})
			.catch((err: string) => {
				console.log(err);
				throw new Error(err);
			});
	}
);

export { router as EditPostCommentRouter };
