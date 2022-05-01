import request from "supertest";
import { app } from "../../app";

it("responds with a new comment", async () => {
	const cookie = await global.signin();

	const newPosts = await global.createPosts();
	const newComments = await global.createComments();

	console.log(newPosts);
	console.log(newComments);

	const postId = newPosts._id;

	const createNewComment = await request(app)
		.post(`/api/post-comments/${postId}/comment/create`)
		.set("Cookie", cookie)
		.send({
			text: "new comment test",
		})
		.expect(201);
});

// it("fails if comment fields are not present", async () => {
// 	const cookie = await global.signin();

// 	const createPost = await request(app)
// 		.post("/api/posts/create")
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new post test",
// 		});

// 	const parsedNewPost = JSON.parse(createPost.text);
// 	const postId = parsedNewPost.newPost.id;

// 	await request(app)
// 		.post(`/api/post-comments/${postId}/comment/create`)
// 		.set("Cookie", cookie)
// 		.expect(400);
// });

// it("fails if the user is not connected", async () => {
// 	const cookie = await global.signin();

// 	const createPost = await request(app)
// 		.post("/api/posts/create")
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new post test",
// 		});

// 	const parsedNewPost = JSON.parse(createPost.text);
// 	const postId = parsedNewPost.newPost.id;

// 	await request(app)
// 		.post(`/api/post-comments/${postId}/comment/create`)
// 		.send({
// 			text: "new comment test",
// 		})
// 		.expect(401);
// });
