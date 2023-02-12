import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import chalk from "chalk";

const log = console.log;
const error = chalk.bold.red;
const msg = chalk.greenBright;

const start = async () => {
	const { JWT_KEY, MONGO_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL } =
		process.env;
	if (!JWT_KEY) {
		throw new Error("Profiles-Service: JWT_KEY must be defined");
	}
	if (!MONGO_URI) {
		throw new Error("Profiles-Service: MONGO_URI must be defined");
	}
	if (!NATS_CLUSTER_ID) {
		throw new Error("Profiles-Service: NATS_CLUSTER_ID must be defined");
	}
	if (!NATS_CLIENT_ID) {
		throw new Error("Profiles-Service: NATS_CLIENT_ID must be defined");
	}
	if (!NATS_URL) {
		throw new Error("Profiles-Service: NATS_URL must be defined");
	}
	try {
		await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);

		natsWrapper.client.on("close", () => {
			log(error("Profiles-Service: NATS connection closed!"));
			process.exit();
		});

		process.on("SIGINT", () => natsWrapper.client.close());
		process.on("SIGTERM", () => natsWrapper.client.close());

		new UserCreatedListener(natsWrapper.client).listen();

		await mongoose
			.set("strictQuery", true)
			.connect(MONGO_URI)
			.then(() =>
				console.log(chalk.green("Profiles-Service: Connected to MongoDB"))
			)
			.catch((err) => {
				console.log(
					"Profiles-Service: Could not connect to MongoDB, Error log:",
					err
				);
			});
	} catch (err) {
		console.error(err);
	}
};

start();

app.listen(3000, () => {
	console.log(chalk.green("Profiles-Service: Listening on port 3000"));
});
