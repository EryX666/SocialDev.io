import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "body-parser";
import morgan from "morgan";
import { errorHandler, NotFoundError, currentUser } from "socialdev-common";

import { CreatePostRouter } from "./routes/create-post";
import { GetPostRouter } from "./routes/get-post";
import { DeletePostRouter } from "./routes/delete-post";
import { LikePostRouter } from "./routes/like-post";
import { EditPostRouter } from "./routes/edit-post";

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

app.use("/api/posts", CreatePostRouter);
app.use("/api/posts", LikePostRouter);
app.use("/api/posts", GetPostRouter);
app.use("/api/posts", DeletePostRouter);
app.use("/api/posts", EditPostRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
