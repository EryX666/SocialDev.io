import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	NotAuthorizedError,
} from "@obiproduction/socialnet-api-common";
import { Comments } from "../../models/comments";

const router = express.Router();

// Route        ---> DELETE api/post-comments/:post_id/comment/:comment_id/embedded/delete
// Description  ---> Delete an embedded comment - a comment on a comment
// Access       ---> Private
router.delete(
	"/:post_id/comment/:comment_id/:e_comment_id/delete",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const {
			post_id: postId,
			comment_id: commentId,
			e_comment_id: eCommentId,
		} = req.params;

		await Comments.findOneAndUpdate(
			{
				_id: postId,
			},
			{},
			{ returnOriginal: false }
		)
			.then((CommentSection: any) => {
				const commentsArray = CommentSection.comments;
				const commentIndx = commentsArray
					.map((comment: any) => comment.id.toString())
					.indexOf(commentId);

				const eCommentIndx = commentsArray[commentIndx].embedded_comments
					.map((eComment: any) => eComment.id.toString())
					.indexOf(eCommentId);
				const embdComment =
					commentsArray[commentIndx].embedded_comments[eCommentIndx];
				const embdCommentsArray = commentsArray[commentIndx].embedded_comments;

				if (userId === embdComment.user.toString()) {
					commentsArray[commentIndx].embedded_comments.splice(eCommentIndx, 1);
					CommentSection.save().then((CommentSection: any) => {
						const commentsArray = CommentSection.comments;
						const commentIndx = commentsArray
							.map((comment: any) => comment.id.toString())
							.indexOf(commentId);
						const embdCommentsArray =
							commentsArray[commentIndx].embedded_comments;

						res.status(201).json({
							success: true,
							embdCommentsArray,
						});
					});
				} else {
					throw new NotAuthorizedError();
				}
			})
			.catch((err: string) => {
				console.log(err);
				throw new NotFoundError();
			});
	}
);

export { router as DeleteEmbeddedCommentsRouter };
