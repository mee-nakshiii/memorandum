const Job = require('../models/Job');

// @desc    Get all jobs sorted by newest first
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 }).populate('postedBy', 'name email role');
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Protected by protect middleware)
const createJob = async (req, res, next) => {
  try {
    const { title, company, description } = req.body;

    // Validate fields
    if (!title || !company || !description) {
      res.status(400);
      throw new Error('Please fill in all fields (title, company, description)');
    }

    // Save job with the logged-in user's id as postedBy
    const newJob = await Job.create({
      title,
      company,
      description,
      postedBy: req.user.id
    });

    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  createJob
};
