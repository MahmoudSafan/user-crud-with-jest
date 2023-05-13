const request = require("supertest");
const app = require("../app"); // your Express app
const User = require("../models/Users.js");
const config = require("../config/config.js");
const mongoose = require("mongoose");

beforeAll(async () => {
	await mongoose.connect(config.DB_URL);
});

afterAll(async () => {
	await mongoose.connection.close();
});

describe("Test the root path", () => {
	it("It should response the GET method", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
		expect(response.text).toContain("form");
	});
});

describe("Test the users path", () => {
	it("POST /users", async () => {
		const response = await request(app).post("/users").send({
			name: "test",
			email: "test2@gmail.com",
			password: "123456",
			phone: "1234567890",
			address: "test address",
		});

		expect(response.statusCode).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.data.name).toBe("test");
		expect(response.body.data.email).toBe("test2@gmail.com");
		expect(response.body.data.phone).toBe("1234567890");
		expect(response.body.data.address).toBe("test address");

		await User.findByIdAndDelete(response.body.data._id);
	});

	it("GET /users", async () => {
		const response = await request(app).get("/users");
		const users = await User.find();

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.count).toBe(users.length);
	});
});

describe("Test the users/:id", () => {
	const id = "645fd32847acfef0a968ebd4";

	beforeEach(async () => {
		await User.create({
			_id: "645fd32847acfef0a968ebd4",
			name: "test",
			email: "test@gmail.com",
			password: "123456",
			phone: "1234567890",
			address: "test address",
		});
	});

	afterEach(async () => {
		await User.findByIdAndDelete(id);
	});

	it("GET /users/:id", async () => {
		const response = await request(app).get(`/users/${id}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.name).toBe("test");
		expect(response.body.data.email).toBe("test@gmail.com");
		expect(response.body.data.phone).toBe("1234567890");
		expect(response.body.data.address).toBe("test address");
	});

	it("PUT /users/:id", async () => {
		const response = await request(app).put(`/users/${id}`).send({
			name: "testUpdate",
			email: "testUpdate22@gmail.com",
		});

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.name).toBe("testUpdate");
		expect(response.body.data.email).toBe("testUpdate22@gmail.com");
		expect(response.body.data.phone).toBe("1234567890");
		expect(response.body.data.address).toBe("test address");
	});

	it("DELETE /users/:id", async () => {
		const response = await request(app).delete(`/users/${id}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data).toEqual({});
	});
});

describe("ERORR Handler", () => {
	it("ERROR POST /users - should return error if email is not valid", async () => {
		await User.create({
			_id: "645fd32847acfef0a968ebd5",
			name: "test",
			email: "test@gmail.com",
			password: "123456",
			phone: "1234567890",
			address: "test address",
		});

		const response = await request(app).post("/users").send({
			name: "test",
			email: "test@gmail.com",
			password: "123456",
			phone: "1234567890",
			address: "test address",
		});

		expect(response.statusCode).toBe(400);
		expect(response.body.success).toEqual(false);
		expect(response.body.message).toBe(
			"email is used before enter an uniqe email"
		);

		await User.findByIdAndDelete("645fd32847acfef0a968ebd5");
	});

	it("ERROR GET /users/:id - should return error if id is not valid", async () => {
		const response = await request(app).get(`/users/123`);

		expect(response.statusCode).toBe(400);
		expect(response.body.success).toBe(false);
		expect(response.body.message).toBe("_id is not valid");
	});

	it("ERROR PUT /users/:id - should return error if id is not valid", async () => {
		const response = await request(app).put(`/users/123`).send({
			name: "testUpdate",
			email: "testUpdate@gmail.com",
		});

		expect(response.statusCode).toBe(400);
		expect(response.body.success).toBe(false);
		expect(response.body.message).toBe("_id is not valid");
	});

	it("ERROR DELETE /users/:id - should return error if id is not valid", async () => {
		const response = await request(app).delete(`/users/123`);

		expect(response.statusCode).toBe(400);
		expect(response.body.success).toBe(false);
		expect(response.body.message).toBe("_id is not valid");
	});
});
