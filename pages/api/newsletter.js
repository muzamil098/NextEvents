import { connectDatabase, insertDocument } from "../../helpers/db-utils";
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail.includes("@") || !userEmail) {
      res.status(422).json({ message: "invalid email" });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to database!" });
      return;
    }
    try {
      await insertDocument(client, "newsletters", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "failed to insert document" });
      return;
    }
    res.status(201).json({ message: "SignedUp!" });
  }
}
export default handler;
