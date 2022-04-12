
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import multer from "multer"
import path from 'path'
import uploadToS3 from './uploadToS3.js'
// import uploadFile from './uploadFile.js'

const upload = multer({ dest: "uploads/" })

dotenv.config()
const app = express()
app.use(cors());
const PORT = process.env.PORT || 4200;
app.post('/upload', upload.any(), async (req, res) => {
  try {
    const uploadedImage = await uploadToS3({
      fileBinary: req.files[0],
      fileName: req.files[0].originalname,
      fileExtension: path.extname(req.files[0].originalname),
      filePath: req.files[0].path,
    });


    res.status(200).json(uploadedImage)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
