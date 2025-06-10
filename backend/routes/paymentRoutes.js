import express from 'express';
import multer from 'multer';
import path from 'path';
import { submitPayment, getAllPayments } from '../controllers/paymentController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('screenshot'), submitPayment);
router.get('/', getAllPayments);

export default router;
