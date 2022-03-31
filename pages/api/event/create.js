import clientPromise from "../../../lib/mongodb";
import { randomId } from "../../../lib/utils";
import formidable from "formidable";
import { ObjectId } from "mongodb";

import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import AWS from "aws-sdk";

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
        const s3 = new AWS.S3({
          apiVersion: "2006-03-01",
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET,
        });
        const _files = Array.isArray(files.file) ? files.file : [files.file];

        for (const file of _files) {
          try {
            const upload = s3.upload({
              Bucket: "elliottzhangphoto",
              Key: path.basename(file.filepath),
              Body: fs.createReadStream(file.filepath),
            });

            const promise = upload.promise();
            const data = await promise;
            entry.images.push({ link: data.Location, key: data.Key });
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
