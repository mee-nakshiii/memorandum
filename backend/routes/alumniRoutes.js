const express = require('express');
const router = express.Router();
const { getAlumni } = require('../controllers/alumniController');

// @route   GET /api/alumni
// @desc    Retrieve list of users with role 'alumni', with optional case-insensitive search by name
// @access  Public
router.get('/', getAlumni);

module.exports = router;
