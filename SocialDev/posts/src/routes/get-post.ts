import express, { Request, Response } from "express";
import { requireAuth } from "socialdev-common";
import { Posts } from "../models/Posts";

const router = express.Router();

// Route        ---> GET api/posts
// Description  ---> Get all posts
// Access       ---> Private
// Role         ---> Admin
router.get("/", requireAuth, async (req: Request, res: Response) => {
	const posts = await Posts.find().sort({ date: -1 });

	res.status(200).json(posts);
});

// Route        ---> GET api/posts/:post_id
// Description  ---> Get post by id
// Access       ---> Private
router.get("/:post_id", requireAuth, async (req, res) => {
	const { post_id: postId } = req.params;

	const post = await Posts.findOne({ _id: postId });

	res.status(200).json(post);
});

export { router as GetPostRouter };
