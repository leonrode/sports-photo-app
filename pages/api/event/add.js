import clientPromise from "../../../lib/mongodb";
import formidable from "formidable";
import { s3upload } from "../../../lib/aws";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      multiples: true,
    });

    return form.parse(req, async (err, fields, files) => {
      if (err != null) {
        console.error(err);
        return res.status(500).send();
      }


    let images = []

      if (files.file) {
        const _files = Array.isArray(files.file) ? files.file : [files.file];

        images = await s3upload(_files);
      }

      // update event in database
      const client = await clientPromise;
      const db = client.db("data");
      try {

        const updateResult = db
          .collection("events")
          .updateOne({ slug: fields.slug }, { $push: { images: {$each: images} } });
      } catch (e) {
        console.error(e);
        return res.status(500).send();
      }

      return res.json({ success: true });
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
