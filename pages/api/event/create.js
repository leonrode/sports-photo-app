import clientPromise from "../../../lib/mongodb";
import { randomId } from "../../../lib/utils";
import formidable from "formidable";
import { ObjectId } from "mongodb";

import { s3upload } from "../../../lib/aws";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
    });

    return form.parse(req, async (err, fields, files) => {
      if (err != null) {
        console.error(err);
        return res.status(500).send();
      }

      const id = new ObjectId();
      const entry = {
        ...fields,
        date: new Date(fields.date),
        slug: randomId(),
        _id: id,

        images: [],
      };

      if (files.file) {
        const _files = Array.isArray(files.file) ? files.file : [files.file];

        entry.images = await s3upload(_files);
      }

      // create event in database
      const client = await clientPromise;
      const db = client.db("data");
      try {
        const insertResult = db.collection("events").insertOne(entry);
        const updateResult = db
          .collection("years")
          .updateOne({ year: entry.year }, { $push: { events: id } });
      } catch (e) {
        console.error(e);
        return res.status(500).send();
      }
      delete entry._id;
      return res.json({ entry: entry });
    });
  }
  return res.status(404).send();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
