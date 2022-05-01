import request from "supertest";
import { app } from "../../app";

it("responds with success if post is deleted", async () => {
	const cookie = await global.signin();

	const createPost = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new test Delete post",
		});

	const parsedNewPost = JSON.parse(createPost.text);
	const newPostId = parsedNewPost.newPost.id;

	await request(app)
		.delete(`/api/posts/${newPostId}/delete`)
		.set("Cookie", cookie)
		.expect(201);
});

it("fails if the user is not connected", async () => {
	const cookie = await global.signin();

	const createPost = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new test Delete post",
		})
		.expect(201);

	const parsedNewPost = JSON.parse(createPost.text);
	const newPostId = parsedNewPost.newPost.id;

	await request(app).delete(`/api/posts/${newPostId}/delete`).expect(401);
});

it("fails if a user is trying to delete a post that he didnt create", async () => {
	const cookie = await global.signin();

	const createPost = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new create post test",
		})
		.expect(201);

	const parsedNewPost = JSON.parse(createPost.text);
	const newPostId = parsedNewPost.newPost.id;

	const cookie_2 = await global.signin();

	await request(app)
		.delete(`/api/posts/${newPostId}/delete`)
		.set("Cookie", cookie_2)
		.expect(401);
});
