import request from "supertest";
import { app } from "../../app";

it("return succesful if the post can be liked and unliked", async () => {
	const cookie = await global.signin();

	const createPost = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new create post test",
		});

	const parsedNewPost = JSON.parse(createPost.text);
	const newPostId = parsedNewPost.newPost.id;

	const likePost = await request(app)
		.post(`/api/posts/${newPostId}/like`)
		.set("Cookie", cookie)
		.expect(201);

	const parsedLikePost = JSON.parse(likePost.text);
	expect(parsedLikePost.likes.length).toEqual(1);

	const unlikePost = await request(app)
		.post(`/api/posts/${newPostId}/like`)
		.set("Cookie", cookie)
		.expect(200);

	const parsedUnlikePost = JSON.parse(unlikePost.text);
	expect(parsedUnlikePost.likes.length).toEqual(0);
});

it("fails if the user is not connected", async () => {
	const cookie = await global.signin();

	const createPost = await request(app)
		.post("/api/posts/create")
		.set("Cookie", cookie)
		.send({
			text: "new create post test",
		});

	const parsedNewPost = JSON.parse(createPost.text);
	const newPostId = parsedNewPost.newPost.id;

	const likePost = await request(app)
		.post(`/api/posts/${newPostId}/like`)
		.expect(401);
});
