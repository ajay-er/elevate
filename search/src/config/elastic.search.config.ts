import { Client } from "@elastic/elasticsearch";

const client = new Client({
	node: "http://elevate:9200",
	auth: {
		username: "elastic",
		password: process.env.ELASTIC_PASSWORD!
	},
	tls: {
		rejectUnauthorized: false
	}
});

export const PingElasticSearch = async () => {
	try {
		await client.ping();
		console.log("elastic search is up and running");
	} catch (error) {
		console.log(error);
	}
};

export { client as ELASTIC_CLIENT };
