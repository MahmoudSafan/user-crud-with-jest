const request = require("supertest");
const app = require("../app"); // your Express app
const User = require("../models/Users.js");

describe("Test the root path", () => {
	it("It should response the GET method", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
		expect(response.text).toContain("form");
	});
});

describe("Test the users path", () => {
	it("It should response the GET method", async () => {
		const response = await request(app).get("/users");
		// const users = await User.find();

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		// expect(response.body.count).toBe(users.length);
		// expect(response.body.data).toEqual(users);
	});
});
