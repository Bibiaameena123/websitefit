import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,  // New controller
} from '../controllers/userController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all users (Admin use)
router.get('/', protect, isAdmin, getUsers);

// POST new user (Admin use)
router.post('/', protect, isAdmin, createUser);

// PUT update user by ID
router.put('/:id', protect, isAdmin, updateUser);

// DELETE user by ID
router.delete('/:id', protect, isAdmin, deleteUser);

// GET logged-in user's profile
router.get('/profile', protect, getUserProfile);

export default router;
