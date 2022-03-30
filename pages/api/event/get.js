import clientPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const slug = req.query.slug;

    if (!slug) return res.status(400).send();

    const client = await clientPromise;
    const db = client.db("data");

    const filter = { slug };

    const result = await db.collection("events").findOne(filter);

    delete result._id;
    return res.json({ result });
  }
  return res.status(404).send();
};

export default handler;
