import express, { Request, Response } from "express";
import { requireAuth, validateRequest, currentUser } from "socialdev-common";
import { Posts } from "../models/Posts";
import { createPostValidation } from "../utilities/validators";
import { PostCreatedPublisher } from "../events/publishers/post-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

// Route        ---> Post api/posts/create
// Description  ---> Create a new post
// Access       ---> Private
router.post(
	"/create",
	requireAuth,
	createPostValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { id: userId, handle } = req.currentUser!;

		const postFields = {
			text: req.body.text,
			handle,
			user: userId,
		};

		const newPost = await Posts.build(postFields);
		await newPost.save();

		await new PostCreatedPublisher(natsWrapper.client).publish({
			id: newPost.id,
		});

		res.status(201).json({
			success: true,
			newPost,
		});
	}
);

export { router as CreatePostRouter };
