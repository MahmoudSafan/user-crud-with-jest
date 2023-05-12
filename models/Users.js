const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const crypto = require("node:crypto");
// const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		maxlength: 25,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please Enter valid email address",
		],
		required: [true, "Please enter an email"],
	},
	password: {
		type: String,
		required: [true, "Password must be at least 8 characters"],
		minlength: 4,
		select: false,
	},
	address: {
		type: String,
		required: [true, "Please enter address"],
		maxlength: 100,
		trim: true,
	},
	phone: {
		type: String,
		required: [true, "Please enter a phone"],
		maxlength: 10,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", UserSchema);
