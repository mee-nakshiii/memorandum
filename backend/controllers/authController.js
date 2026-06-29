const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, department, batch } = req.body;

    // Validate required fields
    if (!name || !email || !password || !department || !batch) {
      res.status(400);
      throw new Error('Please provide all required fields (name, email, password, department, batch)');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    // Validate role if provided
    if (role && !['student', 'alumni', 'admin'].includes(role)) {
      res.status(400);
      throw new Error('Invalid user role');
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already exists');
    }

    // Create a new user (pre-save hook hashes password)
    await User.create({
      name,
      email,
      password,
      role: role || 'student',
      department,
      batch
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Compare password using User model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Check that JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      res.status(500);
      throw new Error('JWT Secret is not configured in environment');
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
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};
