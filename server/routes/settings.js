const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as necessary
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary

const router = express.Router();

// Updating Name
router.post('/updateName', verifyToken, async (req, res) => {
  try {
    // Set the update object
    const userN = await User.findById(req.user.id);
    const filter = { _id: req.user.id };
    let update = { firstName: req.body.firstName, lastName: req.body.lastName };
    
    // If first or last name is empty, only update the other one
    if (update.firstName == '') {
      update = { lastName: req.body.lastName };
    } else if (update.lastName == '') {
      update = { firstName: req.body.firstName };
    }

    // If the first name is the same
    if (req.body.firstName == userN.firstName) { 
      return res.json({ message: 'Same First Name' });
    } 
    // If the last name is the same
    else if (req.body.lastName == userN.lastName) {
      return res.json({ message: 'Same Last Name' });
    }

    // Update the user
    const user = await User.findOneAndUpdate(filter, update, {
      new: true
    });
    res.json({ message: 'Name updated successfully', user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});

// Updating Email
router.post('/updateEmail', verifyToken, async (req, res) => {
  try {
    // Get current Email
    const userEmail = await User.findById(req.user.id);
    // Set the update object
    const filter = { _id: req.user.id };
    const update = { email: req.body.email };

    // If the email is the same email in database
    if (req.body.email == userEmail.email) { 
      return res.json({ message: 'Same Email' });
    } 

    // Update the user
    const user = await User.findOneAndUpdate(filter, update, {
      new: true
    });
    res.json({ message: 'Email updated successfully', user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});

// Updating Password
router.post('/updatePassword', verifyToken, async (req, res) => {
  try {
    // Get the new password
    const { confirmPassword } = req.body;

    // Check if the new password is provided
    if (!confirmPassword) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the password before updating
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

    // Set the update object
    const filter = { _id: req.user.id };
    const update = { password: hashedPassword };

    // Update the user
    const user = await User.findOneAndUpdate(filter, update, { new: true });

    res.json({ message: 'Password updated successfully', user });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error while updating password' });
  }
});

// Verifies Password
router.post('/verifyPassword', verifyToken, async (req, res) => {
  try {
    // Get the current password inputted
    const curPassword = req.body.curPassword;
    // Grab the current user from the database
    const user = await User.findById(req.user.id);

    // If user can't be found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compares the decrypted passwords, and if it doesn't match throw an error
    if (!bcrypt.compareSync(curPassword, user.password)) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }
    res.json({ message: 'Old password is correct' });
  } catch (error) {
    console.error('Error verifying old password:', error);
    res.status(500).json({ message: 'Server error while verifying old password' });
  }
});

module.exports = router;