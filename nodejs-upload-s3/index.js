
dotenv.config()

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import multer from "multer"
import path from 'path'
import uploadToS3 from './uploadToS3.js'

const upload = multer({ dest: "uploads/" })
const app = express()
app.use(cors());

app.post('/upload', upload.any(), async (req, res) => {
  try {
    const uploadedImage = await uploadToS3({
      fileBinary: req.files[0],
      fileName: req.files[0].originalname,
      fileExtension: path.extname(req.files[0].originalname),
      filePath: req.files[0].path,
    });
    res.status(200).json({ status: "success", data: { uploadedImageUrl: uploadedImage } })
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
})

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
