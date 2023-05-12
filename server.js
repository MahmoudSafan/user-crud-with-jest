const express = require("express");
const colors = require("colors");

const dbConnect = require("./config/db");
const config = require("./config/config");

const app = express();

// Connect to DB
dbConnect();

app.get("/hello", (req, res) => {
	res.send("Hello World");
});

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`.bgYellow.bold);
});
