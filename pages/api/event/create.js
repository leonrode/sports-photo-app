import clientPromise from "../../../lib/mongodb";

import formidable from "formidable";
import fs from "fs";
import { ObjectId } from "mongodb";

import { ImgurClient } from "imgur";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
    });

    const imgurClient = new ImgurClient({
      clientId: process.env.IMGUR_CLIENT_ID,
    });

    return form.parse(req, async (err, fields, files) => {
      if (err != null) {
        console.error(err);
        return res.status(500).send();
      }

      const entry = {
        ...fields,
        slug: fields.title.toLowerCase().split(" ").join("-"),
        _id: new ObjectId(),
        images: [],
      };

      if (files.file) {
        const _files = Array.isArray(files.file) ? files.file : [files.file];

        for (const file of _files) {
          try {
            const imgurResponse = await imgurClient.upload({
              image: fs.createReadStream(file.filepath),
              type: "stream",
            });
            entry.images.push({
              link: imgurResponse.data.link,
              hash: imgurResponse.data.deletehash,
              datetime: imgurResponse.data.datetime,
            });
          } catch (e) {
            console.error(e);
            return res.status(500).send();
          }
        }
      }

      // create event in database
      const client = await clientPromise;
      const db = client.db("data");
      try {
        const insertResult = db.collection("events").insertOne(entry);
      } catch (e) {
        console.error(e);
        return res.status(500).send();
      }
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
