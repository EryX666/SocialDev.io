import express, { Request, Response } from "express";
import { requireAuth } from "socialdev-common";
import { Comments } from "../models/comments";

const router = express.Router({ mergeParams: true });

// Route        ---> DELETE api/post-comments/:post_id/comment/:comment_id/delete
// Description  ---> Delete a comment by its id
// Access       ---> Private
router.delete(
	"/:post_id/comment/:comment_id/delete",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { post_id: postId, comment_id: commentId } = req.params;

		await Comments.findOneAndUpdate({ post_ref: postId })
			.then((commentSection: any) => {
				const { comments } = commentSection;

				if (comments.length > 0) {
					const removeIndex = comments
						.map((comment: any) => comment.id.toString())
						.indexOf(commentId);

					if (removeIndex > -1) {
						if (userId === comments[removeIndex].user.toString()) {
							commentSection.comments.splice(removeIndex, 1);
							commentSection
								.save()
								.then((commentSection: any) => res.json(commentSection));
						} else {
							res.status(401).json({ errors: [{ message: "Not Authorized" }] });
						}
					} else {
						res.status(404).json({ errors: [{ message: "Not Found" }] });
					}
				}
			})
			.catch((err: string) => {
				throw new Error(err);
			});
	}
);

export { router as DeletePostCommentRouter };
