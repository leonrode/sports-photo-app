import AWS from "aws-sdk";
import path from "path";
import fs from "fs";
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.A_ACCESS_KEY,
  secretAccessKey: process.env.A_SECRET,
});

const s3upload = async (files) => {
  if (!Array.isArray(files)) files = [files];

  // todo: initialize s3 uploader

  let images = [];
  for (const file of files) {
    try {
      const data = await s3
        .upload({
          Bucket: "elliottzhangphoto",
          Key: path.basename(file.filepath),
          Body: fs.createReadStream(file.filepath),
        })
        .promise();
      images.push({ link: data.Location, key: data.Key });
    } catch (e) {
      throw new Error(e);
    }
  }


  return images;
};

export { s3upload };
