
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import multer from "multer"
import uploadToS3 from './uploadToS3.js'

const upload = multer({ dest: "uploads/" })

dotenv.config()
const app = express()
app.use(cors());
const PORT = process.env.PORT || 4200;
app.post('/upload', upload.any(), async (req, res) => {
  try {

    const uploadedImage = await uploadToS3(req.files, 'uploads', new Date().getMilliseconds());
    res.status(200).json(uploadedImage)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
