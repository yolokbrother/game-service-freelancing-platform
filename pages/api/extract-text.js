import Tesseract from 'tesseract.js';
import { tmpdir } from 'os';
import { join } from 'path';
import { promises as fs } from 'fs';
import multer from 'multer';
import sharp from 'sharp';

const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware = upload.single('image');

export const config = {
  api: {
    bodyParser: false,
  },
};

async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function preprocessImage(buffer) {
  return await sharp(buffer)
    .resize({ width: 800, height: 800, fit: 'inside' })
    .threshold(128)
    .toBuffer();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Run the multer middleware to parse the incoming file
      await runMiddleware(req, res, uploadMiddleware);

      // Save the uploaded image to a temporary file
      const file = req.file;
      const tmpFilePath = join(tmpdir(), file.originalname);

      // Preprocess the image before running Tesseract
      const preprocessedBuffer = await preprocessImage(file.buffer);
      await fs.writeFile(tmpFilePath, preprocessedBuffer);

      // Call the Tesseract.js OCR
      const result = await Tesseract.recognize(tmpFilePath, 'eng+chi_tra', {
        logger: (m) => console.log(m),
        config: {
          tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
                                    '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' +
                                    'Traditional Chinese Characters',
          psm: 3,
        },
      });

      // Remove the temporary file
      await fs.unlink(tmpFilePath);

      // Extract the detected words from the response
      const words = result.data.words.map((word) => word.text);

      res.status(200).json({ words });
    } catch (error) {
      console.error('Error during OCR:', error);
      res.status(500).json({ error: `Error during OCR: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}