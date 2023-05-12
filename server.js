const app = require("./app");
const dbConnect = require("./config/db");
const config = require("./config/config");
// Connect to DB
dbConnect();

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`.bgGreen.bold);
});
