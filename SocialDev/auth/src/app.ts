import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import {
	errorHandler,
	NotFoundError,
} from "@obiproduction/socialnet-api-common";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { registerRouter } from "./routes/register";

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
		secure: true,
	})
);

// Routes
// /api/service/:params.../action
// Auth routes
app.use("/api/auth", currentUserRouter);
app.use("/api/auth", signinRouter);
app.use("/api/auth", signoutRouter);
app.use("/api/auth", registerRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
