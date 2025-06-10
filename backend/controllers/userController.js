import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get all users (exclude password)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new user (for admin)
export const createUser = async (req, res) => {
  try {
    const { fullname, email, password, gender } = req.body;

    if (!fullname || !email || !password || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ fullname, email, password: hashedPassword, gender });
    await user.save();

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, gender } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ message: 'Email already exists' });
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.gender = gender || user.gender;

    await user.save();

    const userData = user.toObject();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --- New controller function to get logged-in user profile ---
export const getUserProfile = async (req, res) => {
  try {
    // req.user.id set by auth middleware
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.fullname,
      email: user.email,
      phone: user.phone || '',
      gender: user.gender,
      membership: user.membership || ''
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
