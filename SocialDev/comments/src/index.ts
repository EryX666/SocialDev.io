import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { PostCreatedListener } from "./events/listeners/post-created-listener";
import { PostDeletedListener } from "./events/listeners/post-deleted-listener";

const start = async () => {
	const { JWT_KEY, MONGO_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } =
		process.env;
	if (!JWT_KEY) {
		throw new Error("Comments-Service: JWT_KEY must be defined");
	}
	if (!MONGO_URI) {
		throw new Error("Comments-Service: MONGO_URI must be defined");
	}
	if (!NATS_CLUSTER_ID) {
		throw new Error("Comments-Service: NATS_CLUSTER_ID must be defined");
	}
	if (!NATS_CLIENT_ID) {
		throw new Error("Comments-Service: NATS_CLIENT_ID must be defined");
	}
	if (!NATS_URL) {
		throw new Error("Comments-Service: NATS_URL must be defined");
	}
	try {
		await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

		natsWrapper.client.on("close", () => {
			console.log("Comments-Service: NATS connection closed!");
			process.exit();
		});

		process.on("SIGINT", () => natsWrapper.client.close());
		process.on("SIGTERM", () => natsWrapper.client.close());

		new PostCreatedListener(natsWrapper.client).listen();
		new PostDeletedListener(natsWrapper.client).listen();

		await mongoose
			.set("strictQuery", true)
			.connect(MONGO_URI)
			.then(() => console.log("Comments-Service: Connected to MongoDB"))
			.catch((err) => {
				console.log(
					"Comments-Service: Could not connect to MongoDB, Error log:",
					err
				);
			});
	} catch (err) {
		console.error(err);
	}
};

start();

app.listen(3000, () => {
	console.log("Comments-Service: Listening on port 3000");
});
