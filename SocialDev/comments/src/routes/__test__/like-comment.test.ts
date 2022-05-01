import request from "supertest";
import { app } from "../../app";

it("return succesful if the comment can be liked and unliked", async () => {
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
	// const likeComment = await request(app)
	// 	.post(`/api/post-comments/${postId}/comment/${commentId}/like`)
	// 	.set("Cookie", cookie)
	// 	.expect(201);
	// const parsedLikeComment = JSON.parse(likeComment.text);
	// expect(parsedLikeComment.newComment.likes.length).toEqual(1);
	// const unlikeComment = await request(app)
	// 	.post(`/api/post-comments/${postId}/comment/${commentId}/like`)
	// 	.set("Cookie", cookie)
	// 	.expect(200);
	// const parsedUnlikeComment = JSON.parse(unlikeComment.text);
	// expect(parsedUnlikeComment.newComment.likes.length).toEqual(0);
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
// 		.post(`/api/post-comments/${postId}/comment/${commentId}/like`)
// 		.expect(401);
// });
