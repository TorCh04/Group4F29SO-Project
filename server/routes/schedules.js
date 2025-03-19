const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary
const Schedule = require('../models/schedule'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();

router.post('/addSchedule', verifyToken, async (req, res) => {
  try {
    const newSchedule = new Schedule({
      name: req.body.name,
      device: req.body.device,
      instructions: req.body.instructions,
      status: 'Active'
    });

    await newSchedule.save();

    // Add the new schedule to the user's schedules array
    const user = await User.findById(req.user.id);
    user.schedules.push(newSchedule._id);
    await user.save();

    res.status(201).json({ message: 'Schedule added successfully', schedule: newSchedule });
  } catch (error) {
    console.error('Error adding schedule:', error);
    res.status(500).json({ message: 'Server error while adding schedule' });
  }
});

router.post('/removeSchedule', verifyToken, async (req, res) => {
  try {
    const scheduleId = req.body.scheduleId;

    // Remove the schedule from the user's schedules array
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { schedules: scheduleId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the schedule from the database
    await Schedule.findByIdAndDelete(scheduleId);

    res.status(200).json({ message: 'Schedule removed successfully', user });
  } catch (error) {
    console.error('Error removing schedule:', error);
    res.status(500).json({ message: 'Server error while removing schedule' });
  }
});

router.get('/getSchedules', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'schedules',
      populate: {
        path: 'device',
        model: 'Device'
      }
    });
    res.json({ schedules: user.schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Server error while fetching schedules' });
  }
});

router.post('/toggleScheduleStatus/:scheduleId', verifyToken, async (req, res) => {
  try {
      const schedule = await Schedule.findById(req.params.scheduleId);
      schedule.status = schedule.status === 'Active' ? 'Inactive' : 'Active';
      await schedule.save();
      res.json({ message: 'Schedule status updated successfully' });
  } catch (error) {
      console.error('Error toggling schedule status:', error);
      res.status(500).json({ message: 'Server error while toggling schedule status' });
  }
});

module.exports = router;
