import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import { json } from "body-parser";
import morgan from "morgan";
import { errorHandler, NotFoundError, currentUser } from "socialdev-common";

import { CurrentProfileRouter } from "./routes/current-profile";
import { EditProfileRouter } from "./routes/edit-profile";
import { QueryProfileRouter } from "./routes/query-profile";

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

app.use("/api/profile", CurrentProfileRouter);
app.use("/api/profile", EditProfileRouter);
app.use("/api/profile", QueryProfileRouter);

app.all("*", async (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
