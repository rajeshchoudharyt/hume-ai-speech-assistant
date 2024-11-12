// // Startup file - never run this file more than once

"use server";
import { readFileSync } from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const indexName = "podcast";
const namespace = "andrew_huberman";
const index = pc.index(indexName);

// main();

async function main() {
	try {
		// Step 1: Create index
		await createIndex();

		// Step 2: Generate embeddings from the pdf data
		let data = await parsePdf();
		const embeddings = await generateEmbeddings(data, "passage");

		const records = data.map((text, i) => ({
			id: i.toString(),
			values: embeddings[i].values,
			metadata: { text },
		}));

		// Step 3: Upsert
		await upsert(records);

		// To check the stats of the upserted data
		const log = await index.describeIndexStats();
		console.log(log);
		//
	} catch (error) {
		throw new Error(error);
	}
}

// Create new index with name "podcast" with 1024 embedding dimension
async function createIndex() {
	try {
		await pc.createIndex({
			name: indexName,
			dimension: 1024,
			metric: "cosine",
			spec: {
				serverless: {
					cloud: "aws",
					region: "us-east-1",
				},
			},
		});
		//
	} catch (error) {
		throw new Error("Error creating index:", error);
	}
}

// Parse pdf to array of strings
async function parsePdf() {
	const dataBuffer = readFileSync("../public/huberman_combined.pdf");

	const data = await pdf(dataBuffer);

	let arr = data.text.split("\n \n");
	arr = arr.map((str) => str.replace(/\n/g, ""));

	return arr;
}

// Upsert data
async function upsert(records) {
	return await index.namespace(namespace).upsert(records);
}

// Generate embeddings
async function generateEmbeddings(data, inputType = "query") {
	try {
		const model = "multilingual-e5-large";
		const embeddings = await pc.inference.embed(model, data, {
			inputType,
			truncate: "END",
		});

		return embeddings.data;
		//
	} catch (error) {
		throw new Error("Error generating embeddings:", error);
	}
}

// Cosine similarity search
async function searchIndex(vector) {
	try {
		return await index.namespace(namespace).query({
			topK: 10,
			vector,
			includeValues: false,
			includeMetadata: true,
		});
		//
	} catch (error) {
		throw new Error("Search error:", error);
	}
}

// Fetch top 10 results
async function fetchSimilarData(query) {
	const embeddings = await generateEmbeddings([query]);

	const result = await searchIndex(embeddings[0].values);

	const data = result.matches.map(
		(obj, i) => `${(i + 1).toString()}. ${obj.metadata.text}`
	);

	return (
		"Below are the top ten paragraphs from the podcast data:\n\n" +
		data.join("\n\n")
	);
}

export { fetchSimilarData };
