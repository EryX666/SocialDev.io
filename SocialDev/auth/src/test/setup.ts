import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
	function signin(user_2?: string | undefined): Promise<string[]>;
}

jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = "asdf";

	mongo = await MongoMemoryServer.create();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	jest.clearAllMocks();
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = async (user_2: string | undefined): Promise<string[]> => {
	if (user_2 === "user_2") {
		const email = "test2@test.com";
		const password = "password";
		const handle = "tester_2";

		const response = await request(app)
			.post("/api/auth/register")
			.send({
				email,
				password,
				handle,
			})
			.expect(201);

		const cookie = response.get("Set-Cookie");

		return cookie;
	} else {
		const email = "test@test.com";
		const password = "password";
		const handle = "tester";

		const response = await request(app)
			.post("/api/auth/register")
			.send({
				email,
				password,
				handle,
			})
			.expect(201);

		const cookie = response.get("Set-Cookie");

		return cookie;
	}
};
