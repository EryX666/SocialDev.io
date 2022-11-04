import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
	function signin(): Promise<string[]>;
	function createPosts(): any;
	function createComments(): any;
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

global.signin = async () => {
	// Build a JWT payload. {id, email}
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: "test@test.com",
	};

	// Create the JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build the session object. { jwt: MY_JWT }
	const session = { jwt: token };

	// Turn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString("base64");

	// Return a string thats the cookie with the encoded data
	return [`express:sess=${base64}`];
};

global.createPosts = async () => {
	const Schema = mongoose.Schema;
	const Posts = mongoose.model(
		"Posts",
		new Schema({
			user: String,
			text: String,
			handle: String,
			likes: Array,
		})
	);

	const newPosts = new Posts({
		_id: "600c8a71b95f76001a0b3a31",
		text: "new post test",
		handle: "tester",
		user: "600b6f9f2a15ef001a96f37f",
		likes: [],
	});

	return newPosts;
};

global.createComments = async () => {
	const Schema = mongoose.Schema;
	const Comments = mongoose.model(
		"Comments",
		new Schema({
			user: String,
			text: String,
			handle: String,
			likes: Array,
		})
	);

	// const newComments = new Comments({
	// 	_id: "600c8a71b95f76001a0b3a31",
	// 	text: "new comment test",
	// 	handle: "tester",
	// 	user: "600b6f9f2a15ef001a96f37f",
	// 	likes: [],
	// });

	return Comments;
};
