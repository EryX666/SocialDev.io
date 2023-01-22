import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "body-parser";
import morgan from "morgan";
import { errorHandler, NotFoundError, currentUser } from "socialdev-common";

import { CreatePostCommentRouter } from "./routes/create-comment";
import { DeletePostCommentRouter } from "./routes/delete-comment";
import { EditPostCommentRouter } from "./routes/edit-comment";
import { LikePostCommentRouter } from "./routes/like-comment";

import { CreateEmbeddedCommentsRouter } from "./routes/embedded-comments/create-embedded-comment";
import { DeleteEmbeddedCommentsRouter } from "./routes/embedded-comments/delete-embedded-comment";
import { EditEmbeddedCommentsRouter } from "./routes/embedded-comments/edit-embedded-comment";
import { LikeEmbeddedCommentsRouter } from "./routes/embedded-comments/like.embedded-comment";

const app = express();

// Middleware

app.use(cors());
app.use(json());
app.use(morgan("short"));
app.set("trust proxy", true);
app.use(
	cookieSession({
		name: "session",
		signed: false,
		// Change secure in Production to 'true' to only send cookies on HTTPS
		secure: false,
	})
);
app.use(currentUser);

// Routes
// Comment routes
app.use("/api/post-comments", CreatePostCommentRouter);
app.use("/api/post-comments", EditPostCommentRouter);
app.use("/api/post-comments", DeletePostCommentRouter);
app.use("/api/post-comments", LikePostCommentRouter);

// Embedded comments routes
app.use("/api/post-comments", CreateEmbeddedCommentsRouter);
app.use("/api/post-comments", DeleteEmbeddedCommentsRouter);
app.use("/api/post-comments", EditEmbeddedCommentsRouter);
app.use("/api/post-comments", LikeEmbeddedCommentsRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
