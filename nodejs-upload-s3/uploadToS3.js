import AWS from 'aws-sdk';
import fs from 'fs';

export default async function uploadToS3({
  fileName,
  filePath,
  fileExtension
}) {
  const s3 = new AWS.S3({
    endpoint: 'http://localhost:4566',
    accessKeyId: 'test',
    secretAccessKey: 'test',
    s3ForcePathStyle: true,
    region: 'us-east-1',
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
    console.log('data', data)
    return data.Location
  } catch (error) {
    console.log('ocorreu um erro', error.message)
  }
}
