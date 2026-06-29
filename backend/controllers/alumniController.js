const User = require('../models/User');

// @desc    Get all users with alumni role, with optional case-insensitive search by name
// @route   GET /api/alumni
// @access  Public
const getAlumni = async (req, res, next) => {
  try {
    const { search } = req.query;

    const query = { role: 'alumni' };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const alumni = await User.find(query).select('-password');
    res.status(200).json(alumni);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlumni
};
