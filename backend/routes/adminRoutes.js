const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getReports } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protect all routes below this middleware using JWT token and 'admin' role checks
router.use(protect);
router.use(admin);

// @route   GET /api/admin/users
// @desc    Retrieve all users registered in the network platform (excluding passwords)
// @access  Private (Admin only)
router.get('/users', getUsers);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a specific user by their Unique Identifier
// @access  Private (Admin only)
router.delete('/users/:id', deleteUser);

// @route   GET /api/admin/reports
// @desc    Retrieve system-wide entity count metrics (users, roles, jobs, events)
// @access  Private (Admin only)
router.get('/reports', getReports);

module.exports = router;
