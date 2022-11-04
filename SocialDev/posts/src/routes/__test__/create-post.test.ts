import request from "supertest";
import { app } from "../../app";

it("responds with a new post", async () => {
	const cookie = await global.signin();

	const response = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new create post test",
		})
		.expect(201);

	const parsedResponse = JSON.parse(response.text);

	expect(parsedResponse.newPost.text).toEqual("new create post test");
});

it("fails if post fields are not present", async () => {
	const cookie = await global.signin();

	await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({})
		.expect(400);
});

it("fails if the user is not connected", async () => {
	await request(app)
		.post("/api/posts/create")
		.send({
			text: "new create post test",
		})
		.expect(401);
});
