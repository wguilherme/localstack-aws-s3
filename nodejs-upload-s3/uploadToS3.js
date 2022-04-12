import AWS from 'aws-sdk'

export default async function uploadToS3(fileBinary, path, filename) {
  // config
  // const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT)
  const s3 = new AWS.S3({
    endpoint: 'http://localhost:4566',
    accessKeyId: 'test',
    secretAccessKey: 'test',
    s3ForcePathStyle: true,
    region: 'us-east-1',
  })

  const params = {
    Bucket: 'test',
    Key: path + filename,
    Body: Buffer.from(fileBinary, 'binary'),
    ACL: 'public-read',
  }

  // upload
  try {
    const data = await s3.upload(params).promise()
    console.log('data', data)
  } catch (error) {
    console.log(error.message)
  }


  // return new Promise((resolve, reject) => {
  //   s3.putObject(params, (error, data) => {
  //     if (error) {
  //       console.log('Caiu no erro', error.message)
  //       reject(error)
  //     }
  //     data.url = `https://${process.env.DO_SPACES_NAME}.${process.env.DO_SPACES_ENDPOINT}/${path}${filename}`
  //     console.log('Your file has been uploaded successfully!', data)
  //     resolve(data.url)
  //   })
  // })
}
