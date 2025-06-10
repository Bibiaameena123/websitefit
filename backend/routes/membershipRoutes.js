import express from 'express';
import { getAll, create } from '../controllers/membershipController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getAll);
router.post('/', protect, isAdmin, create);

export default router;
