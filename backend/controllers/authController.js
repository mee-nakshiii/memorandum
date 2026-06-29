const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department, batch } = req.body;

    // Validate required fields
    if (!name || !email || !password || !department || !batch) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user (pre-save hook hashes password)
    await User.create({
      name,
      email,
      password,
      role,
      department,
      batch
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password using User model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check that JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT Secret is not configured in environment' });
    }

    // Generate JWT containing user id and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return token, role, and name
    res.status(200).json({
      token,
      role: user.role,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error during login' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
