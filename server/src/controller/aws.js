const aws = require("aws-sdk");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION
aws.config.update({
  accessKeyId: accessKeyId ,
  secretAccessKey: secretAccessKey,
  region: region,
});

// aws account configs:

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    // This function will upload the file to AWS and return the link
    let s3 = new aws.S3({ apiVersion: "2006-03-01" }); // We will be using the S3 service of AWS

    const fileSizeLimit = 1024 * 1024 * 1024; // 1 GB limit

    if (file.size > fileSizeLimit) {
      return reject({ error: "File size exceeds the limit of 1 GB." });
    }

    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "abc/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }

      console.log("File uploaded successfully");
      return resolve(data.Location);
    });
  });
};

module.exports = { uploadFile };
