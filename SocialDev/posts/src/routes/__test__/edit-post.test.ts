import request from "supertest";
import { app } from "../../app";

it("responds with a new edited post", async () => {
	const cookie = await global.signin();

	const createPostResponse = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new post",
		})
		.expect(201);

	const parsedNewPost = JSON.parse(createPostResponse.text);
	const newPostId = parsedNewPost.newPost.id;

	const editPostResponse = await request(app)
		.put(`/api/posts/${newPostId}/edit`)
		.set("Cookie", cookie)
		.send({
			text: "new edit post test",
		})
		.expect(200);

	const parsedEditedPost = JSON.parse(editPostResponse.text);

	expect(parsedEditedPost.updatedPost.text).toEqual("new edit post test");
});

// it("fails if post fields are not present", async () => {
// 	const cookie = await global.signin();

// 	await request(app)
// 		.post("/api/posts/create")
// 		.set("Cookie", cookie)
// 		.send({})
// 		.expect(400);
// });

// it("fails if the user is not connected", async () => {
// 	await request(app)
// 		.post("/api/posts/create")
// 		.send({
// 			text: "new create post test",
// 		})
// 		.expect(401);
// });

it("fails if a user is trying to edit a post that he didnt create", async () => {
	const cookie = await global.signin();

	const createPostResponse = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new post",
		})
		.expect(201);

	const parsedNewPost = JSON.parse(createPostResponse.text);
	const newPostId = parsedNewPost.newPost.id;

	const cookie_2 = await global.signin();

	await request(app)
		.put(`/api/posts/${newPostId}/edit`)
		.set("Cookie", cookie_2)
		.send({
			text: "new edit post test",
		})
		.expect(401);
});
