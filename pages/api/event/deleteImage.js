import { s3deleteObject } from "../../../lib/aws";
import clientPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const slug = req.body.slug;
    const key = req.body.key;
    if (!(slug && key)) return res.status(400).send();

    const client = await clientPromise;
    const db = client.db("data");

    const filter = { slug };
    const update = { $pull: { images: { key: key } } };

    try {
      const updateResult = await db
        .collection("events")
        .updateOne(filter, update);

      // determine if image is being used as cover of year somewhere
      const years = await db.collection("years").find().toArray();

      const filterResult = years.filter((year) => year.cover.key === key);
      if (filterResult.length === 0) {
        await s3deleteObject(key);
      }
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send;
    }
  }
  return res.status(404).send();
};

export default handler;
