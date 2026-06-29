const User = require('../models/User');
const Job = require('../models/Job');
const Event = require('../models/Event');

// @desc    Get all users (excluding password)
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reports statistics counts
// @route   GET /api/admin/reports
// @access  Private (Admin only)
const getReports = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalAlumni,
      totalAdmins,
      totalJobs,
      totalEvents
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'alumni' }),
      User.countDocuments({ role: 'admin' }),
      Job.countDocuments({}),
      Event.countDocuments({})
    ]);

    res.status(200).json({
      totalUsers,
      totalStudents,
      totalAlumni,
      totalAdmins,
      totalJobs,
      totalEvents
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getReports
};
