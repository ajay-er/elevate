import "reflect-metadata";
import app from "./app";
import mongoConnect from "./config/mongo";
import { kafka_client } from "./config/kafka.config";
import { USER_CREATED_EVENT_CONSUMER } from "./events/consumers/user.created.consumer";

const PORT = process.env.PORT || 3000;


(async () => {
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI not found");
	}
	try {
		console.clear();		
		await mongoConnect(process.env.MONGO_URI);
		
		await new USER_CREATED_EVENT_CONSUMER(kafka_client).subscribe();

		app.listen(PORT, () => {
			console.log(`Server-Investors is Listening on port ${PORT}`);
		})
			.on("error", async () => {
				console.log('oops something goes wrong');
			})
			.on("close", async () => {});
	} catch (error) {
		console.error("Unable to connect.");
		console.error(error);
	}
})();
