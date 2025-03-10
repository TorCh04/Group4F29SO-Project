const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary

const router = express.Router();

// Route to get humidity and temperature for a specific user
router.get('/getSimulationData', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('humidity temperature'); // Select only humidity and temperature

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Simulation data retrieved successfully',
      humidity: user.humidity,
      temperature: user.temperature
    });
  } catch (error) {
    console.error('Error fetching simulation data:', error);
    res.status(500).json({ message: 'Server error while fetching simulation data' });
  }
});

module.exports = router;