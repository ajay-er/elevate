import app from "./app";
import mongoConnect from "./config/mongo";

const PORT = process.env.PORT || 3000;

(async () => {
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI not found");
	}
	try {
		console.clear();
		console.log("Connecting with MONGO");
		await mongoConnect(process.env.MONGO_URI);

		app.listen(PORT, () => {
			console.log(`Server is Listening on port ${PORT}`);
		});
	} catch (error) {
		console.error("Unable to connect.");
		console.error(error);
	}
})();
