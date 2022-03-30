import clientPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("data");

    const years = await db.collection("years").find().toArray();
    years.forEach((year) => {
      delete year._id;
    });
    return res.json({ years });
  }

  return res.status(404).send();
};

export default handler;
