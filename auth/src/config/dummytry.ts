import { Partitioners } from "kafkajs";
import { kafka_client } from "./kafka.config";

export async function kProducer(topic: string, data: any) {
	const producer = kafka_client.producer({ createPartitioner: Partitioners.LegacyPartitioner });
	try {
		console.log("Connecting producer");
		await producer.connect();
		console.log("Producer connected success");

		const result = await producer.send({
			topic: topic,
			messages: [
				{
					partition: 0,
					value: JSON.stringify({
						data: data
					})
				}
			]
		});

		console.log(result, "😁😁kafka produced");
	} catch (error) {
		console.error("Error with producer:", error);
	} finally {
		console.log("Producer disconnecting...");
		producer.disconnect();
	}

	const consumer = kafka_client.consumer({ groupId: "simple group" });
	try {
		console.log("Connecting consumer");
		await consumer.connect();

		await consumer.subscribe({ topic: "wow", fromBeginning: true });
		await consumer.run({
			eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
				try {
					const decodedMessage = JSON.parse(message.value?.toString() || "");
					console.log(decodedMessage,'wow decoded message worked');
					console.log(`[${topic}]: PART:${partition}:`, decodedMessage , '🥲🥲🥲');
				} catch (error) {
					console.error("Error decoding message:", error);
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
}
