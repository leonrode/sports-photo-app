import AWS from "aws-sdk";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.A_ACCESS_KEY,
  secretAccessKey: process.env.A_SECRET,
});

const s3upload = async (files, callback) => {
  if (!Array.isArray(files)) files = [files];

  // todo: initialize s3 uploader

  for (const file of files) {
    try {
      const data = await s3
        .upload({
          Bucket: "elliottzhangphoto",
          Key: path.basename(file.filepath),
          Body: fs.createReadStream(file.filepath),
        })
        .promise();
      callback(data, null);
    } catch (e) {
      callback(null, e);
    }
  }
};

export { s3upload };
