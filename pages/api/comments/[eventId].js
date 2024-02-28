import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";
async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "failed to connect to database" });
    return;
  }
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newComment = {
      eventId,
      name,
      email,
      text,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Comment Successfully added!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "failed to insert document!" });
      return;
    }
  }
  if (req.method === "GET") {
    // const dummyComments = [
    //   { id: "c1", name: "muzamil", text: "This is comment by muzamil" },
    //   { id: "c2", name: "muzamil", text: "This is comment by wasiullah" },
    // ];
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "failed getting comments." });
    }
  }
  client.close();
}
export default handler;
