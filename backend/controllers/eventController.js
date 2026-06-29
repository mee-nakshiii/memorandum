const Event = require('../models/Event');

// @desc    Get all events sorted by date ascending
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Protected by protect middleware)
const createEvent = async (req, res, next) => {
  try {
    const { title, description, venue, date } = req.body;

    // Validate fields
    if (!title || !description || !venue || !date) {
      res.status(400);
      throw new Error('Please provide all required fields (title, description, venue, date)');
    }

    // Validate date format
    if (isNaN(Date.parse(date))) {
      res.status(400);
      throw new Error('Invalid event date format');
    }

    // Save event in MongoDB
    const newEvent = await Event.create({
      title,
      description,
      venue,
      date
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  createEvent
};
