import express, { Request, Response } from "express";
import {
	requireAuth,
	NotFoundError,
	NotAuthorizedError,
} from "@obiproduction/socialnet-api-common";
import { Comments } from "../../models/comments";

const router = express.Router();

// Route        ---> POST api/post-comments/:post_id/comment/:comment_id/embedded/like
// Description  ---> Like an embedded comment - a comment on a comment
// Access       ---> Private
router.post(
	"/:post_id/comment/:comment_id/:e_comment_id/like",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId, handle } = req.currentUser!;
		const {
			post_id: postId,
			comment_id: commentId,
			e_comment_id: eCommentId,
		} = req.params;
		const { text } = req.body;

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

				if (embdComment.likes.length > 0) {
					let userHasLiked = embdComment.likes.filter(
						(like: any) => like.user.toString() === userId
					);
					if (userHasLiked.length > 0) {
						const removeIndex = embdComment.likes
							.map((like: any) => like.user.toString())
							.indexOf(userId);
						embdComment.likes.splice(removeIndex, 1);

						CommentSection.save().then(() => {
							res.status(200).json({ success: true, newComment: embdComment });
						});
						return false;
					}
				}
				let userLiked = {
					user: userId,
					handle,
				};
				embdComment.likes.push(userLiked);
				CommentSection.save().then(() => {
					res.status(201).json({ success: true, newComment: embdComment });
				});
			})
			.catch((err: string) => {
				console.log(err);
				throw new NotFoundError();
			});
	}
);

export { router as LikeEmbeddedCommentsRouter };
