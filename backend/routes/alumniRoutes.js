const express = require('express');
const router = express.Router();
const { getAlumni } = require('../controllers/alumniController');

// Route for getting all alumni (with optional search)
router.get('/', getAlumni);

module.exports = router;
