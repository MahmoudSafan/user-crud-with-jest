const express = require("express");
const colors = require("colors");
const path = require("path");
const cors = require("cors");
const userRouts = require("./routes/users");
const { errorHandler } = require("./middleware/errorHandler.js");

const app = express();

app.use(express.static(path.join(__dirname, "views")));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "form.html"));
});

app.use("/users", userRouts);

app.use(errorHandler);

// catch unhandled rejections
process.on("unhandledRejection", (error, promise) => {
	console.log(`Error: ${error.message}`.bgRed.bold);
	// close server & exit process
	server.close(() => process.exit(1));
});

module.exports = app;
