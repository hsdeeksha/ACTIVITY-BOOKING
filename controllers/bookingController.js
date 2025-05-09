// controllers/bookingController.js
const Booking = require('../models/booking');
const Activity = require('../models/Activity');
const User = require('../models/User');

// Example: list activities controller
exports.listActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Example: book activity controller
exports.bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;
    const userId = req.user.id;

    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(400).json({ msg: 'Activity not found' });

    const booking = new Booking({
      user: userId,
      activity: activityId
    });

    await booking.save();
    res.json({ msg: 'Activity booked successfully', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Example: get my bookings controller
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('activity');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
