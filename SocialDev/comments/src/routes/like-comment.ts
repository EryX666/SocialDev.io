import express from "express";
import { requireAuth, NotFoundError } from "socialdev-common";
import { Comments } from "../models/comments";

const router = express.Router({ mergeParams: true });

// Route        ---> POST api/post-comments/:post_id/comment/:comment_id/like
// Description  ---> Like or unlike a comment by id
// Access       ---> Private
router.post(
	"/:post_id/comment/:comment_id/like",
	requireAuth,
	async (req, res) => {
		const { id: userId, handle } = req.currentUser!;
		const { post_id: postId, comment_id: commentId } = req.params;

		await Comments.findOneAndUpdate(
			{ _id: postId, "comments._id": commentId },
			{},
			{ returnOriginal: true }
		)
			.then((commentSection: any) => {
				const { comments } = commentSection;
				const LikeIndex = comments
					.map((comment: any) => comment.id.toString())
					.indexOf(commentId);

				if (comments[LikeIndex].likes.length > 0) {
					let userHasLiked = comments[LikeIndex].likes.filter(
						(like: any) => like.user.toString() === userId
					);
					if (userHasLiked.length > 0) {
						const removeIndex = comments[LikeIndex].likes
							.map((like: any) => like.user.toString())
							.indexOf(userId);
						comments[LikeIndex].likes.splice(removeIndex, 1);

						commentSection
							.save()
							.then(() =>
								res
									.status(200)
									.json({ success: true, newComment: comments[LikeIndex] })
							);
						return false;
					}
				}
				let userLiked = {
					user: userId,
					handle,
				};
				comments[LikeIndex].likes.push(userLiked);
				commentSection
					.save()
					.then(() =>
						res
							.status(201)
							.json({ success: true, newComment: comments[LikeIndex] })
					);
			})
			.catch(() => {
				throw new NotFoundError();
			});
	}
);

export { router as LikePostCommentRouter };
