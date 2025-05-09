const express = require('express');
const { body, validationResult } = require('express-validator');
const Activity = require('../models/Activity');
const { listActivities, bookActivity, getMyBookings } = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

// Public Route: List all activities
router.get('/activities', listActivities);

// Authenticated Route: Book an activity
router.post(
  '/book',
  auth,
  [
    body('activityId', 'Activity ID is required').notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  bookActivity
);

// Authenticated Route: Get user's bookings
router.get('/my-bookings', auth, getMyBookings);

// Temporary Dev Route: Add a new activity
router.post(
  '/add-activity',
  [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('location', 'Location is required').notEmpty(),
    body('date', 'Date is required and must be a valid date').isISO8601(),
    body('time', 'Time is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, location, date, time } = req.body;

      const activity = new Activity({ title, description, location, date, time });
      await activity.save();
      res.status(201).json({ msg: 'Activity added successfully', activity });
    } catch (err) {
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  }
);

module.exports = router;