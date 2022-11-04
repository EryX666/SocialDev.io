import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
	const { JWT_KEY, MONGO_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } =
		process.env;
	if (!JWT_KEY) {
		throw new Error("Auth-Service: JWT_KEY must be defined");
	}
	if (!MONGO_URI) {
		throw new Error("Auth-Service: MONGO_URI must be defined");
	}
	if (!NATS_CLUSTER_ID) {
		throw new Error("Auth-Service: NATS_CLUSTER_ID must be defined");
	}
	if (!NATS_CLIENT_ID) {
		throw new Error("Auth-Service: NATS_CLIENT_ID must be defined");
	}
	if (!NATS_URL) {
		throw new Error("Auth-Service: NATS_URL must be defined");
	}
	try {
		await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

		natsWrapper.client.on("close", () => {
			console.log("Auth-Service: NATS connection closed!");
			process.exit();
		});

		process.on("SIGINT", () => natsWrapper.client.close());
		process.on("SIGTERM", () => natsWrapper.client.close());

		await mongoose
			.connect(MONGO_URI)
			.then(() => console.log("Auth-Service: Connected to MongoDB"))
			.catch((err) => {
				console.log(
					"Auth-Service: Could not connect to MongoDB, Error log:",
					err
				);
			});
	} catch (err) {
		console.error(err);
	}
};

start();

app.listen(3000, () => {
	console.log("Auth-Service: Listening on port 3000");
});
