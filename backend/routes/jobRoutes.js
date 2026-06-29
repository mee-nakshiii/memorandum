const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/jobs
// @desc    Retrieve all jobs listed in descending order of creation
// @access  Public
router.get('/', getJobs);

// @route   POST /api/jobs
// @desc    Post a new job (saves logged-in user id as poster)
// @access  Private (Requires valid JWT token)
router.post('/', protect, createJob);

module.exports = router;
