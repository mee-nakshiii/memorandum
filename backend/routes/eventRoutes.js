const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/events
// @desc    Retrieve all events sorted by date in ascending order
// @access  Public
router.get('/', getEvents);

// @route   POST /api/events
// @desc    Post a new event in the database
// @access  Private (Requires valid JWT token)
router.post('/', protect, createEvent);

module.exports = router;
