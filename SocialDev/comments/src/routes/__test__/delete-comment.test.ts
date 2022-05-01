import request from "supertest";
import { app } from "../../app";

it("responds with success if comment is deleted", async () => {
	// const cookie = await global.signin();
	// const createPost = await request(app)
	// 	.post("/api/posts/create")
	// 	.set("Cookie", cookie)
	// 	.send({
	// 		text: "new post test",
	// 	});
	// const parsedNewPost = JSON.parse(createPost.text);
	// const postId = parsedNewPost.newPost.id;
	// const newComment = await request(app)
	// 	.post(`/api/post-comments/${postId}/comment/create`)
	// 	.set("Cookie", cookie)
	// 	.send({
	// 		text: "new comment test",
	// 	})
	// 	.expect(201);
	// const parsedNewComment = JSON.parse(newComment.text);
	// const commentId = parsedNewComment.newComment._id;
	// const deleteComment = await request(app)
	// 	.delete(`/api/post-comments/${postId}/comment/${commentId}/delete`)
	// 	.set("Cookie", cookie)
	// 	.expect(200);
	// expect(deleteComment.body.comments.length).toEqual(0);
});

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

// 	const newComment = await request(app)
// 		.post(`/api/post-comments/${postId}/comment/create`)
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new comment test",
// 		})
// 		.expect(201);

// 	const parsedNewComment = JSON.parse(newComment.text);
// 	const commentId = parsedNewComment.newComment._id;

// 	await request(app)
// 		.delete(`/api/post-comments/${postId}/comment/${commentId}/delete`)
// 		.expect(401);
// });

// it("fails if a user is trying to delete a comment that he didnt create", async () => {
// 	const cookie = await global.signin();

// 	const createPost = await request(app)
// 		.post("/api/posts/create")
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new post test",
// 		});

// 	const parsedNewPost = JSON.parse(createPost.text);
// 	const postId = parsedNewPost.newPost.id;

// 	const newComment = await request(app)
// 		.post(`/api/post-comments/${postId}/comment/create`)
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new comment test",
// 		})
// 		.expect(201);

// 	const parsedNewComment = JSON.parse(newComment.text);
// 	const commentId = parsedNewComment.newComment._id;

// 	const cookie_2 = await global.signin();

// 	await request(app)
// 		.delete(`/api/post-comments/${postId}/comment/${commentId}/delete`)
// 		.set("Cookie", cookie_2)
// 		.expect(401);
// });
