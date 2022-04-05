import { s3deleteObject } from "../../../lib/aws";
import clientPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const slug = req.body.slug;

    if (!slug) return res.status(400).send();

    const client = await clientPromise;
    const db = client.db("data");

    const filter = { slug };

    //const result = await db.collection("events").findOne(filter);

    // get image keys for deletion
    const event = await db.collection("events").findOne(filter);

    if (!event) {
      return res.status(404).send();
    }

    for (const image of event.images) {
      await s3deleteObject(image.key);
    }


    // delete event from events collection
    try {
      await db.collection("events").deleteOne(filter);
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send;
    }



  }
  return res.status(404).send();
};

export default handler;
