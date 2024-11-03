import { MongoClient } from "mongodb";
export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://muzamilchanna8:QFVv5ianpAhQGt4b@cluster0.jbvsw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`
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
