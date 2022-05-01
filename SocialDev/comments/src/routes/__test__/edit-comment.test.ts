import request from "supertest";
import { app } from "../../app";

it("responds with a new edited comment", async () => {
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
	// const editComment = await request(app)
	// 	.put(`/api/post-comments/${postId}/comment/${commentId}/edit`)
	// 	.set("Cookie", cookie)
	// 	.send({
	// 		text: "edit comment test",
	// 	})
	// 	.expect(200);
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

// 	const newComment = await request(app)
// 		.post(`/api/post-comments/${postId}/comment/create`)
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new comment test",
// 		})
// 		.expect(201);

// 	const parsedNewComment = JSON.parse(newComment.text);
// 	const commentId = parsedNewComment.newComment._id;

// 	const editComment = await request(app)
// 		.put(`/api/post-comments/${postId}/comment/${commentId}/edit`)
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

// 	const newComment = await request(app)
// 		.post(`/api/post-comments/${postId}/comment/create`)
// 		.set("Cookie", cookie)
// 		.send({
// 			text: "new comment test",
// 		})
// 		.expect(201);

// 	const parsedNewComment = JSON.parse(newComment.text);
// 	const commentId = parsedNewComment.newComment._id;

// 	const editComment = await request(app)
// 		.put(`/api/post-comments/${postId}/comment/${commentId}/edit`)
// 		.send({
// 			text: "edit comment test",
// 		})
// 		.expect(401);
// });

// it("fails if a user is trying to edit a post that he didnt create", async () => {
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

// 	const editComment = await request(app)
// 		.put(`/api/post-comments/${postId}/comment/${commentId}/edit`)
// 		.set("Cookie", cookie_2)
// 		.send({
// 			text: "edit comment test",
// 		})
// 		.expect(401);
// });
