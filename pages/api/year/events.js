import clientPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("data");

    const year = req.query.year;
    if (!year) return res.status(400).send();

    const query = { year: year };

    const events = await db.collection("events").find(query).toArray();

    events.forEach((event) => {
      delete event._id;
    });
    return res.json({ events });
  }

  return res.status(404).send();
};

export default handler;
