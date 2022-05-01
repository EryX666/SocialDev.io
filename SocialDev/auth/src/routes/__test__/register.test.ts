import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 201 on successful register", async () => {
	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
			password: "password",
			handle: "tester",
		})
		.expect(201);
});

it("returns a 400 with an invalid email", async () => {
	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test",
			password: "password",
			handle: "tester",
		})
		.expect(400);
});

it("returns a 400 with an invalid password", async () => {
	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
			password: "123",
			handle: "tester",
		})
		.expect(400);
});

it("returns a 400 with missing email or password", async () => {
	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
		})
		.expect(400);

	await request(app)
		.post("/api/auth/register")
		.send({
			password: "password",
		})
		.expect(400);
});

it("disallows duplicate emails", async () => {
	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
			password: "password",
			handle: "tester",
		})
		.expect(201);

	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
			password: "password",
			handle: "tester",
		})
		.expect(400);
});

it("sets a cookie after successful register", async () => {
	const response = await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
			password: "password",
			handle: "tester",
		})
		.expect(201);

	expect(response.get("Set-Cookie")).toBeDefined();
});

it("publishes an event", async () => {
	await request(app)
		.post("/api/auth/register")
		.send({
			email: "test@test.com",
			password: "password",
			handle: "tester",
		})
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
