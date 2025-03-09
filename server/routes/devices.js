const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary
const Device = require('../models/Device'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();

router.post('/addDevice', verifyToken, async (req, res) => {
  try {
    const newDevice = new Device({
      name: req.body.name,
      type: req.body.type,
      status: req.body.status
    });

    await newDevice.save();

    // Add the new device to the user's devices array
    const user = await User.findById(req.user.id);
    user.devices.push(newDevice._id);
    await user.save();

    res.status(201).json({ message: 'Device added successfully', device: newDevice });
  } catch (error) {
    console.error('Error adding device:', error);
    res.status(500).json({ message: 'Server error while adding device' });
  }
});

router.post('/removeDevice', verifyToken, async (req, res) => {
  try {
    const deviceId = req.body.deviceId;

    // Remove the device from the user's devices array
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { devices: deviceId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Device.findByIdAndDelete(deviceId);

    res.status(200).json({ message: 'Device removed successfully', user });
  } catch (error) {
    console.error('Error removing device:', error);
    res.status(500).json({ message: 'Server error while removing device' });
  }
});

router.get('/getDevices', verifyToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).populate('devices');
      res.json({ devices: user.devices });
  } catch (error) {
      console.error('Error fetching devices:', error);
      res.status(500).json({ message: 'Server error while fetching devices' });
  }
});

router.post('/toggleDeviceStatus/:deviceId', verifyToken, async (req, res) => {
  try {
      const device = await Device.findById(req.params.deviceId);
      device.status = device.status === 'Connected' ? 'Not Connected' : 'Connected';
      await device.save();
      res.json({ message: 'Device status updated successfully' });
  } catch (error) {
      console.error('Error toggling device status:', error);
      res.status(500).json({ message: 'Server error while toggling device status' });
  }
});

module.exports = router;