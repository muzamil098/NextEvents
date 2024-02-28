import { MongoClient } from "mongodb";
export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://muzamil:rYXHTACHBwW3tq6K@cluster0.g20aki9.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0`
  );
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
