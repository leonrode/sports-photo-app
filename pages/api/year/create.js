import clientPromise from "../../../lib/mongodb";

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
        cover: {},
        _id: id,
      };

      if (files.file) {

        try {
          const images = await s3upload(files.file);
          entry.cover = images[0];
        } catch (e) {
          console.error(e);
          return res.status(500).send();
        }
      }

      // create event in database
      const client = await clientPromise;
      const db = client.db("data");
      try {
        const insertResult = db.collection("years").insertOne(entry);
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
    bodyParser: {
      sizeLimit: "1TB"
    },
  },
};

export default handler;
