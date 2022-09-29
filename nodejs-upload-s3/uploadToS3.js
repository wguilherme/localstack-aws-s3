import AWS from 'aws-sdk';
import fs from 'fs';

export default async function uploadToS3({
  fileName,
  filePath,
  fileExtension
}) {
  const s3 = new AWS.S3({
    endpoint: process.env.AWS_S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    s3ForcePathStyle: true,
    region: process.env.AWS_REGION,
  })

  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: new Date().getTime() + fileExtension,
    Body: fileContent,
    ACL: 'public-read'
  }

  try {
    const data = await s3.upload(params).promise()
    console.log({ status: 'success', message: 'File uploaded successfully', data: { data } })
    return data.Location
  } catch (error) {
    console.log({ status: 'error', message: error.message })
  }
}
