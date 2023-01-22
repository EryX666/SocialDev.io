import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "body-parser";
import morgan from "morgan";
import { errorHandler, NotFoundError, currentUser } from "socialdev-common";

import { QueryFriendsRouter } from "./routes/get-friends-list";
import { AnswerFriendsRequestsRouter } from "./routes/answer-request";
import { CancelFriendshipRouter } from "./routes/cancel-friendship";
import { SendFriendsRequestsRouter } from "./routes/send-request";

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(morgan("dev"));
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

app.use("/api/friends", QueryFriendsRouter);
app.use("/api/friends", AnswerFriendsRequestsRouter);
app.use("/api/friends", SendFriendsRequestsRouter);
app.use("/api/friends", CancelFriendshipRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
